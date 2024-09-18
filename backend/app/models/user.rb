class User < ApplicationRecord
  has_many :memberships, dependent: :destroy
  has_many :push_subscriptions, dependent: :destroy

  has_many :organizations, through: :memberships

  validates :email, uniqueness: true
end
