class PushSubscription < ApplicationRecord
  belongs_to :user, optional: false

  # validates :user_id, presence: true
  validates :endpoint, presence: true, uniqueness: true
  validates :p256dh_key, :auth_key, presence: true

  validates :user_agent, presence: true
  validates :is_bot, inclusion: { in: [true, false] }

end
