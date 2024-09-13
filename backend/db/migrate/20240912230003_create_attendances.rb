class CreateAttendances < ActiveRecord::Migration[7.0]
  def change
    create_table :attendances, id: :uuid do |t|
      t.references :user, type: :uuid, foreign_key: true
      t.references :event, type: :uuid, foreign_key: true
      t.datetime :time
      t.integer :status

      t.timestamps
    end
  end
end
