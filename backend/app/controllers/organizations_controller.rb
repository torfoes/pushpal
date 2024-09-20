class OrganizationsController < ApplicationController
  before_action :optional_authenticate_request, only: [:show]
  before_action :authenticate_request, except: [:show]
  before_action :set_organization, only: %i[show edit update destroy send_push_notifications]
  before_action :authorize_member!, only: [:show]
  before_action :authorize_admin!, only: [:send_push_notifications]


  # GET /organizations or /organizations.json
  def index
    @organizations = Organization.all
    render json: @organizations, status: :ok
  end

  # GET /organizations/1 or /organizations/1.json
  def show
    if @is_member
      members = @organization.memberships.includes(:user).map do |membership|
        {
          id: membership.user.id,
          name: membership.user.name,
          email: membership.user.email,
          picture: membership.user.picture,
          role: membership.role,
        }
      end
    else
      members = []
    end

    response = {
      id: @organization.id,
      name: @organization.name,
      description: @organization.description,
      member_count: @organization.memberships.count,
      members: members
    }

    render json: response, status: :ok
  end

  # POST /organizations or /organizations.json
  def create
    @organization = Organization.new(organization_params)

    ActiveRecord::Base.transaction do
      if @organization.save
        Membership.create!(
          user: @current_user,
          organization: @organization,
          role: :creator
        )

        render json: @organization, status: :created, location: @organization
      else
        render json: @organization.errors, status: :unprocessable_entity
      end
    end
  end

  # PATCH/PUT /organizations/1 or /organizations/1.json
  def update
    if @organization.update(organization_params)
      render json: @organization, status: :ok
    else
      render json: @organization.errors, status: :unprocessable_entity
    end
  end

  # DELETE /organizations/1 or /organizations/1.json
  def destroy
    @organization.destroy
    render json: { message: 'Organization was successfully destroyed.' }, status: :no_content
  end

  # POST /organizations/:id/send_push_notifications
  def send_push_notifications
    permitted_params = params.permit(:title, :body, data: {})

    title = permitted_params[:title]
    body = permitted_params[:body]
    data = permitted_params[:data] || {}

    unless title.present? && body.present?
      render json: { success: false, errors: ['Title and Body are required.'] }, status: :bad_request and return
    end

    member_user_ids = @organization.memberships.pluck(:user_id)

    push_subscriptions = PushSubscription.where(user_id: member_user_ids)

    if push_subscriptions.empty?
      render json: { message: 'No subscribers to send notifications to.' }, status: :ok and return
    end

    successes = []
    failures = []

    push_subscriptions.find_each do |subscription|
      notification_service = PushNotificationService.new(subscription)
      result = notification_service.send_notification(title, body, data)

      if result[:success]
        successes << subscription.id
      else
        failures << { subscription_id: subscription.id, error: result[:error] }
      end
    end

    render json: {
      success_count: successes.count,
      failure_count: failures.count,
      failures: failures
    }, status: :ok
  end


  private

  def set_organization
    @organization = Organization.find(params[:id])
  end

  def organization_params
    params.require(:organization).permit(:name, :description)
  end
end
