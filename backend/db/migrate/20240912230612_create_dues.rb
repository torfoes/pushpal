class CreateDues < ActiveRecord::Migration[7.0]
  def change
    create_table :dues do |t|
      t.uuid :user
      t.date :date
      t.float :amount
      t.string :payment_id
      t.integer :status
      t.string :semester

      t.timestamps
    end
  end
end
