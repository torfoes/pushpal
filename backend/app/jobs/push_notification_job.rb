class PushNotificationJob < ApplicationJob
  queue_as :default

  def perform(notification_id)
    notification = Notification.find_by(id: notification_id)
    return unless notification

    target_users = if notification.user_id.present?
                     [notification.user]
                   elsif notification.event_id.present?
                     notification.event.users
                   else
                     User.all
                   end

    target_users.each do |user|
      user.push_subscriptions.each do |subscription|
        service = PushNotificationService.new(subscription)
        result = service.send_notification(notification.message, notification.message, notification.data || {})

        unless result[:success]
          Rails.logger.error "Failed to send notification to subscription ID #{subscription.id}: #{result[:error]}"
        end
      end
    end

    notification.update(sent_at: Time.current)
  end
end
