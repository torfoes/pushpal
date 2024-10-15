# frozen_string_literal: true

class PushSubscription < ApplicationRecord
  belongs_to :user, optional: false

  validates :user_id, :endpoint, :auth_key, :p256dh_key, presence: true
  validates :endpoint, uniqueness: { case_sensitive: false }
end
