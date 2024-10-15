# frozen_string_literal: true

# db/migrate/20240918000300_create_memberships.rb
class CreateMemberships < ActiveRecord::Migration[7.0]
  def change
    create_table :memberships, id: :uuid, default: 'gen_random_uuid()', force: :cascade do |t|
      t.uuid :user_id, null: false
      t.uuid :organization_id, null: false
      t.integer :role, default: 0, null: false
      t.integer :status, default: 0, null: true
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false

      t.index :user_id
      t.index :organization_id
    end

    add_foreign_key :memberships, :users
    add_foreign_key :memberships, :organizations
  end
end
