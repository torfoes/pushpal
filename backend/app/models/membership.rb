class Membership < ApplicationRecord
  belongs_to :user
  belongs_to :organization

  enum role: {
    member: 0,
    creator: 1,
    manager: 2
  }

  validates :user_id, :organization_id, :role, presence: true
end
