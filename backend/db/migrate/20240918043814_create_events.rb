# frozen_string_literal: true

class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events, id: :uuid, default: 'gen_random_uuid()', force: :cascade do |t|
      t.uuid :creator_membership_id, null: false
      t.string :name
      t.date :date
      t.text :description
      t.uuid :organization_id, null: false
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false

      t.index :creator_membership_id
      t.index :organization_id
    end

    add_foreign_key :events, :memberships, column: :creator_membership_id
    add_foreign_key :events, :organizations
  end
end
