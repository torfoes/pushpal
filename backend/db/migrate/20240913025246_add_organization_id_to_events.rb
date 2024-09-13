class AddOrganizationIdToEvents < ActiveRecord::Migration[7.0]
  def change
    add_column :events, :organization_id, :uuid
  end
end
