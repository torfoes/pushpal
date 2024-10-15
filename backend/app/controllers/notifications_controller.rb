# app/controllers/notifications_controller.rb

class NotificationsController < ApplicationController
  include OrganizationContext

  # set organization context for all actions
  before_action :set_organization
  before_action :set_current_member_role
  before_action :set_current_membership

  before_action :authorize_admin!, only: %i[update destroy]
  before_action :authorize_member!, only: %i[index show]


  # GET /organizations/:organization_id/notifications
  def index
    @notifications = @organization.notifications.order(sent_at: :desc)

    render json: @notifications, status: :ok
  end

  # GET /organizations/:organization_id/notifications/recent
  def recent
    @recent_notifications = @organization.notifications
                                         .where.not(sent_at: nil)
                                         .order(sent_at: :desc)
                                         .limit(10)  # Adjust the limit as needed

    render json: @recent_notifications, status: :ok
  end

  # GET /organizations/:organization_id/notifications/:id
  def show
    render json: @notification, status: :ok
  end

  # POST /organizations/:organization_id/notifications
  def create
    @notification = @organization.notifications.build(notification_params)
    @notification.creator_membership = current_user.memberships.find_by(organization: @organization)

    if @notification.save
      render json: @notification, status: :created, location: [@organization, @notification]
    else
      render json: @notification.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /organizations/:organization_id/notifications/:id
  def update
    if @notification.update(notification_params)
      render json: @notification, status: :ok
    else
      render json: @notification.errors, status: :unprocessable_entity
    end
  end

  # DELETE /organizations/:organization_id/notifications/:id
  def destroy
    @notification.destroy
    render json: { message: 'Notification was successfully destroyed.' }, status: :no_content
  end

  private

  def set_organization
    @organization = Organization.find(params[:organization_id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Organization not found' }, status: :not_found
  end

  def set_notification
    @notification = @organization.notifications.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Notification not found' }, status: :not_found
  end

  def notification_params
    params.require(:notification).permit(:send_type, :title, :message, :sent_at, :status)
  end
end
