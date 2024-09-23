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

    options = {
      vapid: {
        subject: VAPID_KEYS[:subject],
        public_key: VAPID_KEYS[:public_key],
        private_key: VAPID_KEYS[:private_key],
      },
      ttl: 60,
    }

    begin
      Rails.logger.debug("VAPID Public Key: #{options[:vapid][:public_key].present? ? 'Loaded' : 'Missing'}")
      Rails.logger.debug("VAPID Private Key: #{options[:vapid][:private_key].present? ? 'Loaded' : 'Missing'}")
      Rails.logger.debug("VAPID Subject: #{options[:vapid][:subject].present? ? 'Loaded' : 'Missing'}")

      response = Webpush.payload_send(
        message: payload,
        endpoint: @subscription.endpoint,
        p256dh: @subscription.p256dh_key,
        auth: @subscription.auth_key,
        vapid: options[:vapid],
        ttl: options[:ttl]
      )
      status_code = response.code.to_i

      if status_code.between?(200, 299)
        Rails.logger.info("Push notification sent successfully to subscription ID: #{@subscription.id}")
        return { success: true }
      else
        Rails.logger.error("Push notification failed with status #{response.code} for subscription ID: #{@subscription.id}")
        handle_failed_push(status_code)
      end
    rescue Webpush::ExpiredSubscription => e
      Rails.logger.warn("Expired subscription (ID: #{@subscription.id}): #{e.message}")
      @subscription.destroy
      return { success: false, error: "Expired subscription and has been removed." }
    rescue Webpush::InvalidSubscription => e
      Rails.logger.warn("Invalid subscription (ID: #{@subscription.id}): #{e.message}")
      @subscription.destroy
      return { success: false, error: "Invalid subscription and has been removed." }
    rescue => e
      Rails.logger.error("An error occurred while sending push notification to subscription ID: #{@subscription.id} - #{e.message}")
      return { success: false, error: "An error occurred: #{e.message}" }
    end
  end

  private

  def handle_failed_push(status_code)
    case status_code
    when 410, 404
      Rails.logger.warn("Subscription expired or invalid (status #{status_code}) for subscription ID: #{@subscription.id}, removing...")
      @subscription.destroy
      { success: false, status: status_code, error: "Subscription expired or invalid (status #{status_code}) and has been removed." }
    else
      Rails.logger.error("Push failed with status #{status_code} for subscription ID: #{@subscription.id}")
      { success: false, status: status_code, error: "Push failed with status #{status_code}" }
    end
  end
end
