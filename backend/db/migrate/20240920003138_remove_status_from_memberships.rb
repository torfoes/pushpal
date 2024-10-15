# frozen_string_literal: true

class RemoveStatusFromMemberships < ActiveRecord::Migration[7.0]
  def change
    remove_column :memberships, :status, :integer
  end
end
