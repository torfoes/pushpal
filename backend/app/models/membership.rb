class Membership < ApplicationRecord
  belongs_to :user
  belongs_to :organization

  has_many :attendances, dependent: :destroy

  has_many :notifications_as_creator,
           class_name: 'Notification',
           foreign_key: 'creator_membership_id',
           dependent: :destroy

  has_many :notifications_as_recipient,
           class_name: 'Notification',
           foreign_key: 'recipient_membership_id',
           dependent: :destroy

  enum role: { member: 0, creator: 1, manager: 2 }


  validates :user_id, :organization_id, :role, presence: true
  validates :role, inclusion: { in: roles.keys }
  validates :user_id, uniqueness: { scope: :organization_id, message: 'already a member of this organization' }
end
