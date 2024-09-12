class Notification < ApplicationRecord
  belongs_to :user
  belongs_to :event

  enum send_type: { email: 0, sms: 1, push: 2 }
  enum message_type: { rsvp_request: 0, reminder: 1, ticket_delivery: 2 }

  validates :send_type, presence: true
  validates :message_type, presence: true
end
