class CreateDues < ActiveRecord::Migration[7.0]
  def change
    create_table :dues, id: :uuid do |t|
      t.references :user, type: :uuid, foreign_key: true
      t.date :date
      t.float :amount
      t.string :payment_id
      t.integer :status
      t.string :semester

      t.timestamps
    end
  end
end
