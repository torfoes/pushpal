class User < ApplicationRecord
  self.primary_key = 'id'

  has_many :memberships, dependent: :destroy
  has_many :organizations, through: :memberships

  has_many :push_subscriptions, dependent: :destroy
  has_many :notifications, dependent: :nullify

  validates :email, uniqueness: true
  # validates :picture, url: true, allow_nil: true
end
