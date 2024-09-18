class PushSubscription < ApplicationRecord
  belongs_to :user, optional: false

  validates :user_id, presence: true
  validates :endpoint, presence: true, uniqueness: true
  validates :p256dh_key, :auth_key, presence: true

  validates :browser_name, :device_type, :os_name, :cpu_architecture, presence: true
end
