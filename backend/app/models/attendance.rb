class Attendance < ApplicationRecord
  belongs_to :membership
  belongs_to :event

  validates :membership_id, :event_id, presence: true
end
