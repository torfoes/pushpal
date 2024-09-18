class Notification < ApplicationRecord
  belongs_to :recipient_membership, class_name: 'Membership', foreign_key: 'recipient_membership_id'
  belongs_to :creator_membership, class_name: 'Membership', foreign_key: 'creator_membership_id'

  enum send_type: { push: 0, email: 1, sms: 2 }
  enum status: { pending: 0, delivered: 1, failed: 2 }

  validates :recipient_membership, presence: true
  validates :creator_membership, presence: true
  validates :send_type, presence: true
  validates :status, presence: true
  validates :title, presence: true
  validates :message, presence: true
end