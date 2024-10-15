# frozen_string_literal: true

class AddAttendanceRequiredToEvents < ActiveRecord::Migration[7.0]
  def change
    add_column :events, :attendance_required, :boolean, default: false
  end
end
