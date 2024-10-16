class AddOrganizationToNotifications < ActiveRecord::Migration[7.0]
  def change
    add_reference :notifications, :organization, null: false, foreign_key: true, type: :uuid
  end
end
