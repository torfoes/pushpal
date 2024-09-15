class Organization < ApplicationRecord
  has_many :memberships, dependent: :destroy
  has_many :users, through: :memberships
  has_many :events, dependent: :destroy
  has_many :notifications, dependent: :destroy
  has_many :dues, dependent: :destroy
  has_many :invitations, dependent: :destroy

  validates :name, presence: true
end
