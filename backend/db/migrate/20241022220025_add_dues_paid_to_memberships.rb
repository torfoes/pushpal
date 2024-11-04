# frozen_string_literal: true

class AddDuesPaidToMemberships < ActiveRecord::Migration[7.0]
  def change
    add_column :memberships, :dues_paid, :boolean
  end
end
