class Attendance < ApplicationRecord
  belongs_to :user
  belongs_to :event

  enum status: { invited: 0, rsvped: 1, checked_in: 2, cancelled: 3 }

  validates :status, presence: true
end
