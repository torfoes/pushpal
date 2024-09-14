class AddPictureToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :picture, :string, null: true
  end
end
