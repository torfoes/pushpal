class PushSubscriptionsController < ApplicationController

  # POST /push-subscriptions
  def create
    push_subscription = @current_user.push_subscriptions.new(push_subscription_params)
    push_subscription.last_used_at = Time.current

    if push_subscription.save
      render json: { success: true }, status: :created
    else
      render json: { errors: push_subscription.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /push-subscriptions/:id
  def destroy
    subscription = PushSubscription.find_by(id: params[:id])

    if subscription
      subscription.destroy
      render json: { success: true }, status: :ok
    else
      render json: { success: false, errors: ['Subscription not found'] }, status: :not_found
    end
  end

  # GET /push-subscriptions
  def index
    subscriptions = PushSubscription.all
    render json: { success: true, subscriptions: subscriptions }, status: :ok
  end

  # GET /push-subscriptions/:id
  def show
    subscription = PushSubscription.find_by(id: params[:id])

    if subscription
      render json: { success: true, subscription: subscription }, status: :ok
    else
      render json: { success: false, errors: ['Subscription not found'] }, status: :not_found
    end
  end

  # GET /push-subscriptions/:id/view
  def view
    subscription = PushSubscription.find_by(id: params[:id])

    if subscription
      render json: { success: true, subscription: subscription }, status: :ok
    else
      render json: { success: false, errors: ['Subscription not found'] }, status: :not_found
    end
  end

  private

  def push_subscription_params
    params.require(:push_subscription).permit(
      :endpoint,
      :p256dh_key,
      :auth_key,
      :is_bot,
      :browser_name,
      :browser_version,
      :device_model,
      :device_type,
      :device_vendor,
      :engine_name,
      :engine_version,
      :os_name,
      :os_version,
      :cpu_architecture,
      :user_agent
    )
  end
end
