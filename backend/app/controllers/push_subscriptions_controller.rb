# frozen_string_literal: true

class PushSubscriptionsController < ApplicationController
  before_action :set_push_subscription, only: %i[destroy show view send_notification]

  # POST /push-subscriptions
  def create
    push_subscription = @current_user.push_subscriptions.find_or_initialize_by(endpoint: push_subscription_params[:endpoint])

    push_subscription.assign_attributes(
      p256dh_key: push_subscription_params[:p256dh_key],
      auth_key: push_subscription_params[:auth_key],
      expiration_time: push_subscription_params[:expirationTime],
      is_bot: push_subscription_params[:is_bot],
      browser_name: push_subscription_params[:browser_name],
      browser_version: push_subscription_params[:browser_version],
      engine_name: push_subscription_params[:engine_name],
      engine_version: push_subscription_params[:engine_version],
      os_name: push_subscription_params[:os_name],
      os_version: push_subscription_params[:os_version],
      device_vendor: push_subscription_params[:device_vendor],
      device_model: push_subscription_params[:device_model],
      device_type: push_subscription_params[:device_type],
      cpu_architecture: push_subscription_params[:cpu_architecture],
      user_agent: push_subscription_params[:user_agent]
    )

    if push_subscription.save
      render json: { success: true, subscription: push_subscription }, status: :created
    else
      render json: { success: false, errors: push_subscription.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /push-subscriptions/:endpoint
  def destroy
    if @push_subscription
      if @push_subscription.destroy
        render json: { success: true, message: 'Unsubscribed successfully.' }, status: :ok
      else
        render json: { success: false, errors: @push_subscription.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { success: false, errors: ['Subscription not found'] }, status: :not_found
    end
  end

  # GET /push-subscriptions
  def index
    subscriptions = @current_user.push_subscriptions
    render json: { success: true, subscriptions: subscriptions }, status: :ok
  end

  # GET /push-subscriptions/:endpoint
  def show
    if @push_subscription
      render json: { success: true, subscription: @push_subscription }, status: :ok
    else
      render json: { success: false, errors: ['Subscription not found'] }, status: :not_found
    end
  end

  # GET /push-subscriptions/:endpoint/view
  def view
    if @push_subscription
      render json: { success: true, subscription: @push_subscription }, status: :ok
    else
      render json: { success: false, errors: ['Subscription not found.'] }, status: :not_found
    end
  end

  # POST /push-subscriptions/:endpoint/send_notification
  def send_notification
    unless @push_subscription
      return render json: { success: false, errors: ['Subscription not found.'] }, status: :not_found
    end

    notification_params = params.require(:notification).permit(:title, :body, data: {})
    title = notification_params[:title] || 'Default Title'
    body = notification_params[:body] || 'Default Body'
    data = notification_params[:data] || {}

    notification_service = PushNotificationService.new(@push_subscription)

    result = notification_service.send_notification(title, body, data)

    if result[:success]
      render json: { success: true, message: 'Push notification sent successfully.' }, status: :ok
    else
      render json: { success: false, error: result[:error] }, status: :unprocessable_entity
    end
  end

  private

  def set_push_subscription
    @push_subscription = @current_user.push_subscriptions.find_by(endpoint: params[:endpoint])
  end

  def push_subscription_params
    params.require(:push_subscription).permit(
      :endpoint,
      :p256dh_key,
      :auth_key,
      :expirationTime,
      :is_bot,
      :browser_name,
      :browser_version,
      :engine_name,
      :engine_version,
      :os_name,
      :os_version,
      :device_vendor,
      :device_model,
      :device_type,
      :cpu_architecture,
      :user_agent
    )
  end
end
