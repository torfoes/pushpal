class MakeRecipientAndCreatorMembershipIdsNonNullableInNotifications < ActiveRecord::Migration[7.0]
  def change
    change_column_null :notifications, :recipient_membership_id, false

    change_column_null :notifications, :creator_membership_id, false

    unless foreign_key_exists?(:notifications, :memberships, column: :recipient_membership_id)
      add_foreign_key :notifications, :memberships, column: :recipient_membership_id, on_delete: :cascade
    end

    unless foreign_key_exists?(:notifications, :memberships, column: :creator_membership_id)
      add_foreign_key :notifications, :memberships, column: :creator_membership_id, on_delete: :cascade
    end
  end
end