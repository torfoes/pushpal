class CreateNotifications < ActiveRecord::Migration[7.0]
  def change
    create_table :notifications do |t|
      t.uuid :user
      t.uuid :event
      t.string :message
      t.integer :send_type
      t.integer :message_type
      t.datetime :sent_at

      t.timestamps
    end
  end
end
