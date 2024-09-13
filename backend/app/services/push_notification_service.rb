# app/services/push_notification_service.rb

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
      # icon: '/icons/icon-192x192.png',
    }.to_json

    options = {
      vapid: {
        subject: 'mailto:karloszuru@gmail.com',
        public_key: ENV['VAPID_PUBLIC_KEY'] || Rails.application.credentials.webpush[:public_key],
        private_key: ENV['VAPID_PRIVATE_KEY'] || Rails.application.credentials.webpush[:private_key],
      },
      ttl: 60,
    }

    begin
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
        if [410, 404].include?(response.code.to_i)
          @subscription.destroy
          return { success: false, status: response.code.to_i, error: "Subscription expired or invalid (status #{response.code}) and has been removed." }
        else
          return { success: false, status: response.code.to_i, error: "Push failed with status #{response.code}" }
        end
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
end
