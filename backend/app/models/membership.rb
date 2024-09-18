class Membership < ApplicationRecord
  belongs_to :user
  belongs_to :organization

  enum role: {
    member: 0,
    creator: 1,
    manager: 2
  }

  validates :user_id, :organization_id, :role, presence: true
  validates :user_id, uniqueness: { scope: :organization_id, message: 'already a member of this organization' }
end
