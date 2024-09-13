class User < ApplicationRecord
  self.primary_key = 'id'

  authenticates_with_sorcery!

  has_many :memberships, dependent: :destroy
  has_many :organizations, through: :memberships

  has_many :push_subscriptions, dependent: :destroy
  has_many :notifications, dependent: :nullify

  # Add validations
  # validates :uin, presence: false, uniqueness: true, length: { is: 9 }, numericality: { only_integer: true }
  validates :password, length: { minimum: 8 }, if: -> { new_record? || changes[:crypted_password] }
  validates :password, confirmation: true, if: -> { new_record? || changes[:crypted_password] }
  validates :password_confirmation, presence: true, if: -> { new_record? || changes[:crypted_password] }
  validates :email, uniqueness: true
end
