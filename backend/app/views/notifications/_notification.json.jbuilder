# frozen_string_literal: true

json.extract! notification, :id, :user, :event, :message, :send_type, :message_type, :sent_at, :created_at, :updated_at
json.url notification_url(notification, format: :json)
