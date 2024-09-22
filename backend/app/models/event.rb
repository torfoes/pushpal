class Event < ApplicationRecord
  belongs_to :creator, class_name: 'Membership', foreign_key: 'creator_membership_id'
  belongs_to :organization

  has_many :attendances, dependent: :destroy
  has_many :attendees, through: :attendances, source: :user

  validates :creator_membership_id, presence: true
  validates :organization_id, presence: true
end