# app/models/event.rb
class Event < ApplicationRecord
  belongs_to :creator_membership, class_name: 'Membership'
  belongs_to :organization
  has_many :attendances, dependent: :destroy

  validates :creator_membership_id, :organization_id, :name, :start_time, :duration, presence: true
  validates :duration, numericality: { only_integer: true, greater_than: 0 }

  # validate :start_time_cannot_be_in_the_past

  private

  # def start_time_cannot_be_in_the_past
  #   if start_time.present? && start_time < Time.current
  #     errors.add(:start_time, "can't be in the past")
  #   end
  # end

end
