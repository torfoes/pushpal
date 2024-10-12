class AddRsvpTimeToAttendances < ActiveRecord::Migration[7.0]
  def change
    add_column :attendances, :rsvp_time, :datetime
  end
end
