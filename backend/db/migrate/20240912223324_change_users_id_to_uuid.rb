class ChangeUsersIdToUuid < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :id, :integer
    add_column :users, :id, :uuid, default: 'gen_random_uuid()', null: false

    execute "ALTER TABLE users ADD PRIMARY KEY (id);"
  end
end
