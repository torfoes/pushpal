# frozen_string_literal: true

# app/controllers/notifications_controller.rb

class NotificationsController < ApplicationController
  include OrganizationContext

  # Set organization and membership context for all actions
  before_action :set_organization
  before_action :set_current_member_role
  before_action :set_current_membership

  # Authorization callbacks
  before_action :authorize_admin!, only: %i[create update destroy]
  before_action :authorize_member!, only: %i[index show recent]

  # Set notification context only for actions that need it
  before_action :set_notification, only: %i[show update destroy]

  # GET /organizations/:organization_id/notifications
  def index
    @notifications = @organization.notifications.order(created_at: :desc)
    render json: @notifications, status: :ok
  end

  # GET /organizations/:organization_id/notifications/:id
  def show
    render json: @notification, status: :ok
  end

  # POST /organizations/:organization_id/notifications
  def create
    @notification = @organization.notifications.build(notification_params)
    @notification.creator_membership = @current_membership
    @notification.send_type = :push
    @notification.status = :pending

    if @notification.save
      # Send push notifications
      result = send_push_notifications(@notification)

      if result[:success]
        @notification.update(status: :sent, sent_at: Time.current)
        render json: @notification, status: :created, location: [@organization, @notification]
      else
        @notification.update(status: :failed)
        render json: { errors: result[:errors] }, status: :unprocessable_entity
      end
    else
      render json: { errors: @notification.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /organizations/:organization_id/notifications/:id
  def update
    if @notification.update(notification_params)
      render json: @notification, status: :ok
    else
      render json: { errors: @notification.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /organizations/:organization_id/notifications/:id
  def destroy
    @notification.destroy
    render json: { message: 'Notification was successfully destroyed.' }, status: :no_content
  end

  # GET /organizations/:organization_id/notifications/recent
  def recent
    @recent_notifications = @organization.notifications
                                         .where.not(sent_at: nil)
                                         .order(sent_at: :desc)
                                         .limit(10)

    render json: @recent_notifications, status: :ok
  end

  private

  # Set the organization based on params[:organization_id]
  def set_organization
    @organization = Organization.find_by(id: params[:organization_id])
    return if @organization

    render json: { error: 'Organization not found' }, status: :not_found
  end

  # Set the notification within the context of the current organization
  def set_notification
    @notification = @organization.notifications.find_by(id: params[:id])
    return if @notification

    render json: { error: 'Notification not found' }, status: :not_found
  end

  # Only allow a list of trusted parameters through
  def notification_params
    params.require(:notification).permit(:title, :message)
  end

  # Send push notifications to all members of the organization
  def send_push_notifications(notification)
    title = notification.title
    body = notification.message
    data = {}

    member_user_ids = @organization.memberships.pluck(:user_id)
    push_subscriptions = PushSubscription.where(user_id: member_user_ids)

    return { success: false, errors: ['No subscribers to send notifications to.'] } if push_subscriptions.empty?

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

    if failures.empty?
      { success: true }
    else
      { success: false, errors: failures }
    end
  end
end
