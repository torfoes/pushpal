class Due < ApplicationRecord
  belongs_to :membership
  belongs_to :organization

  enum status: { pending: 0, paid: 1, overdue: 2 }

  validates :membership_id, presence: true
  validates :organization_id, presence: true
  validates :status, presence: true, inclusion: { in: statuses.keys }
  validates :date, presence: true
  validates :amount, presence: true, numericality: { greater_than_or_equal_to: 0 }
end
