class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events, id: :uuid do |t|
      t.references :creator, type: :uuid, foreign_key: { to_table: :users }
      t.string :name
      t.date :date
      t.text :description

      t.timestamps
    end
  end
end
