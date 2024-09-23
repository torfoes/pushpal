require 'webpush'

class PushNotificationService
  def initialize(subscription)
    @subscription = subscription
  end

  def send_notification(title, body, data = {})
    payload = {
      title: title,
      body: body,
      data: data,
      # icon: '/icons/icon-192x192.png', # Optional
    }.to_json
    # make sure vapid subject matches exactly
    options = {
      vapid: {
        subject: 'mailto: karloszuru@gmail.com',
        public_key: vapid_public_key,
        private_key: vapid_private_key,
      },
      ttl: 60,
    }

    begin
      Rails.logger.info("Sending push notification to subscription: #{@subscription.id}")

      response = Webpush.payload_send(
        message: payload,
        endpoint: @subscription.endpoint,
        p256dh: @subscription.p256dh_key,
        auth: @subscription.auth_key,
        vapid: options[:vapid],
        ttl: options[:ttl]
      )

      if response.code.between?(200, 299)
        return { success: true }
      else
        handle_failed_push(response.code)
      end
    rescue Webpush::ExpiredSubscription => e
      @subscription.destroy
      return { success: false, error: "Expired subscription and has been removed." }
    rescue Webpush::InvalidSubscription => e
      @subscription.destroy
      return { success: false, error: "Invalid subscription and has been removed." }
    rescue => e
      return { success: false, error: "An error occurred: #{e.message}" }
    end
  end

  private

  def vapid_public_key
    ENV['VAPID_PUBLIC_KEY'] || Rails.application.credentials.webpush[:public_key]
  end

  def vapid_private_key
    ENV['VAPID_PRIVATE_KEY'] || Rails.application.credentials.webpush[:private_key]
  end

  def handle_failed_push(status_code)
    if [410, 404].include?(status_code.to_i)
      Rails.logger.warn("Subscription expired or invalid (status #{status_code}) for subscription: #{@subscription.id}, removing...")
      @subscription.destroy
      return { success: false, status: status_code.to_i, error: "Subscription expired or invalid (status #{status_code}) and has been removed." }
    else
      return { success: false, status: status_code.to_i, error: "Push failed with status #{status_code}" }
    end
  end
end
