class AddExpirationTimeToPushSubscriptions < ActiveRecord::Migration[7.0]
  def change
    add_column :push_subscriptions, :expiration_time, :datetime
  end
end
