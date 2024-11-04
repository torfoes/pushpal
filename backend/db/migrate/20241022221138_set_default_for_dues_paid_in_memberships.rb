# frozen_string_literal: true

class SetDefaultForDuesPaidInMemberships < ActiveRecord::Migration[7.0]
  def change
    change_column_default :memberships, :dues_paid, from: nil, to: false
  end
end
