# frozen_string_literal: true

class CreateAttendances < ActiveRecord::Migration[7.0]
  def change
    create_table :attendances, id: :uuid, default: 'gen_random_uuid()', force: :cascade do |t|
      t.uuid :membership_id, null: false
      t.uuid :event_id, null: false
      t.datetime :time
      t.boolean :rsvp_status, default: false
      t.boolean :checkin_status, default: false
      t.boolean :invitation_sent, default: false
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false

      t.index :membership_id
      t.index :event_id
    end

    add_foreign_key :attendances, :memberships
    add_foreign_key :attendances, :events
  end
end
