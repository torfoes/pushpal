class AddDeviceInfoToPushSubscriptions < ActiveRecord::Migration[7.0]
  def change
    add_column :push_subscriptions, :is_bot, :boolean
    add_column :push_subscriptions, :browser_name, :string
    add_column :push_subscriptions, :browser_version, :string
    add_column :push_subscriptions, :device_model, :string
    add_column :push_subscriptions, :device_type, :string
    add_column :push_subscriptions, :device_vendor, :string
    add_column :push_subscriptions, :engine_name, :string
    add_column :push_subscriptions, :engine_version, :string
    add_column :push_subscriptions, :os_name, :string
    add_column :push_subscriptions, :os_version, :string
    add_column :push_subscriptions, :cpu_architecture, :string
    add_column :push_subscriptions, :user_agent, :string
    add_column :push_subscriptions, :last_used_at, :datetime
  end
end
