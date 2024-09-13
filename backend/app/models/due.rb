class Due < ApplicationRecord
  belongs_to :user

  enum status: { pending: 0, paid: 1, overdue: 2 }

  validates :amount, presence: true, numericality: { greater_than: 0 }
  validates :status, presence: true
  validates :semester, presence: true
end
