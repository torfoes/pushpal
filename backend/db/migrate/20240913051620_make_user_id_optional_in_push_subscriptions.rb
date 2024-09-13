class MakeUserIdOptionalInPushSubscriptions < ActiveRecord::Migration[7.0]
  def change
    change_column_null :push_subscriptions, :user_id, true
  end
end
