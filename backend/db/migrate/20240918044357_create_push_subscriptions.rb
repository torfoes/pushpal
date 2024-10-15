# frozen_string_literal: true

class CreatePushSubscriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :push_subscriptions, id: :uuid, default: 'gen_random_uuid()', force: :cascade do |t|
      t.uuid :user_id, null: false
      t.string :endpoint, null: false
      t.string :auth_key, null: false
      t.string :p256dh_key, null: false
      t.text :device_info
      t.boolean :is_bot
      t.string :browser_name
      t.string :browser_version
      t.string :device_model
      t.string :device_type
      t.string :device_vendor
      t.string :engine_name
      t.string :engine_version
      t.string :os_name
      t.string :os_version
      t.string :cpu_architecture
      t.string :user_agent
      t.datetime :last_used_at
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false

      t.index :endpoint, unique: true
      t.index :user_id
    end

    add_foreign_key :push_subscriptions, :users
  end
end
