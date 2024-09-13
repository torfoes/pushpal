class Membership < ApplicationRecord
  belongs_to :user
  belongs_to :organization

  enum role: { member: 0, admin: 1 }

  validates :user_id, :organization_id, :role, presence: true
end
