# frozen_string_literal: true

class CreateDues < ActiveRecord::Migration[7.0]
  def change
    create_table :dues, id: :uuid, default: 'gen_random_uuid()', force: :cascade do |t|
      t.uuid :membership_id, null: false
      t.date :date
      t.float :amount
      t.string :payment_id
      t.integer :status, default: 0
      t.uuid :organization_id, null: false
      t.string :semester
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false

      t.index :membership_id
      t.index :organization_id
    end

    add_foreign_key :dues, :memberships
    add_foreign_key :dues, :organizations
  end
end
