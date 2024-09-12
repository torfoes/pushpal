class CreateAttendances < ActiveRecord::Migration[7.0]
  def change
    create_table :attendances do |t|
      t.uuid :user
      t.uuid :event
      t.datetime :time
      t.integer :status

      t.timestamps
    end
  end
end
