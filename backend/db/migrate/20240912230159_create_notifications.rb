class CreateNotifications < ActiveRecord::Migration[7.0]
  def change
    create_table :notifications, id: :uuid do |t|
      t.references :user, type: :uuid, foreign_key: true
      t.references :event, type: :uuid, foreign_key: true
      t.string :message
      t.integer :send_type
      t.integer :message_type
      t.datetime :sent_at

      t.timestamps
    end
  end
end
