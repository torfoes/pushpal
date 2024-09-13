class CreateMemberships < ActiveRecord::Migration[7.0]
  def change
    create_table :memberships, id: :uuid do |t|
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.references :organization, null: false, foreign_key: true, type: :uuid
      t.integer :role, null: false, default: 0
      t.timestamps
    end
    add_index :memberships, [:user_id, :organization_id], unique: true
  end
end
