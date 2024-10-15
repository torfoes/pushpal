# frozen_string_literal: true

class Organization < ApplicationRecord
  has_many :memberships, dependent: :destroy
  has_many :users, through: :memberships
  has_many :events, dependent: :destroy
  has_many :dues, dependent: :destroy

  has_many :sent_notifications, through: :memberships, source: :sent_notifications

  validates :name, presence: true
end
