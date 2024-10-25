# frozen_string_literal: true

class Organization < ApplicationRecord
  has_many :memberships, dependent: :destroy
  has_many :users, through: :memberships
  has_many :events, dependent: :destroy


  has_many :notifications, dependent: :destroy

  validates :name, presence: true
end
