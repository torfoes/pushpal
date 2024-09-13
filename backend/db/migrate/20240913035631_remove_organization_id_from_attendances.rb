class RemoveOrganizationIdFromAttendances < ActiveRecord::Migration[7.0]
  def change
    remove_column :attendances, :organization_id, :uuid
  end
end
