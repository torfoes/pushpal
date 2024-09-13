class PushSubscription < ApplicationRecord
  belongs_to :user, optional: true

  validates :endpoint, presence: true, uniqueness: true
  validates :p256dh_key, :auth_key, presence: true
end
