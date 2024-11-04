# frozen_string_literal: true

# app/models/notification.rb

class Notification < ApplicationRecord
  belongs_to :organization
  belongs_to :creator_membership, class_name: 'Membership', foreign_key: 'creator_membership_id'

  validates :organization, presence: true
  validates :creator_membership, presence: true
  validates :send_type, presence: true
  validates :status, presence: true
  validates :title, presence: true
  validates :message, presence: true

  enum send_type: { email: 0, sms: 1, push: 2 }
  enum status: { pending: 0, sent: 1, failed: 2 }
end
