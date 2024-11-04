# frozen_string_literal: true

class RemoveRecipientMembershipFromNotifications < ActiveRecord::Migration[7.0]
  def change
    remove_column :notifications, :recipient_membership_id, :uuid
  end
end
