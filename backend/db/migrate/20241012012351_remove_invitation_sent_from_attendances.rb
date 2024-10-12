class RemoveInvitationSentFromAttendances < ActiveRecord::Migration[7.0]
  def change
    remove_column :attendances, :invitation_sent, :boolean
  end
end
