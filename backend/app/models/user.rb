# frozen_string_literal: true

class User < ApplicationRecord
  has_many :memberships, dependent: :destroy
  has_many :push_subscriptions, dependent: :destroy

  has_many :organizations, through: :memberships

  validates :email, presence: true, uniqueness: { case_sensitive: false }
end
