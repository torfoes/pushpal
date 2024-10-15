# frozen_string_literal: true

class CreateNotifications < ActiveRecord::Migration[7.0]
  def change
    create_table :notifications, id: :uuid, default: 'gen_random_uuid()', force: :cascade do |t|
      t.uuid :recipient_membership_id, null: false
      t.uuid :creator_membership_id, null: false
      t.integer :send_type, null: false, default: 0
      t.string :title, null: false
      t.text :message, null: false
      t.datetime :sent_at
      t.integer :status, null: false, default: 0
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false

      t.index :recipient_membership_id, name: 'index_notifications_on_recipient_membership_id'
      t.index :creator_membership_id, name: 'index_notifications_on_creator_membership_id'
    end

    add_foreign_key :notifications, :memberships, column: :recipient_membership_id, on_delete: :cascade
    add_foreign_key :notifications, :memberships, column: :creator_membership_id, on_delete: :cascade
  end
end
