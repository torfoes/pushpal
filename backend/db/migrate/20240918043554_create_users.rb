# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users, id: :uuid, default: 'gen_random_uuid()', force: :cascade do |t|
      t.string :email, null: false
      t.string :name
      t.string :phone_number
      t.string :picture
      t.string :uin
      t.string :sub
      t.integer :role
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false

      t.index :email, unique: true
    end
  end
end
