# frozen_string_literal: true

class Event < ApplicationRecord
  belongs_to :creator_membership, class_name: 'Membership'
  belongs_to :organization
  has_many :attendances, dependent: :destroy

  validates :creator_membership_id, :organization_id, :name, :date, presence: true
end
