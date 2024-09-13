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
      icon: '/icons/icon-192x192.png',
    }.to_json

    options = {
      vapid: {
        subject: 'mailto: karloszuru@gmail.com',
        public_key: ENV['VAPID_PUBLIC_KEY'] || Rails.application.credentials.webpush[:public_key],
        private_key: ENV['VAPID_PRIVATE_KEY'] || Rails.application.credentials.webpush[:private_key],
      },
      ttl: 60,
    }

    Webpush.payload_send(
      message: payload,
      endpoint: @subscription.endpoint,
      p256dh: @subscription.p256dh_key,
      auth: @subscription.auth_key,
      vapid: options[:vapid],
      ttl: options[:ttl]
    )
  end
end
