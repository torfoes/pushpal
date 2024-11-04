# frozen_string_literal: true

class AddStartTimeAndDurationToEvents < ActiveRecord::Migration[7.0]
  def up
    add_column :events, :start_time, :datetime
    add_column :events, :duration, :integer # Duration in minutes (adjust as needed)

    # Migrate data from `date` to `start_time`
    Event.reset_column_information
    Event.find_each do |event|
      event.update_columns(start_time: event.date.beginning_of_day)
      # Optionally set a default duration, e.g., 60 minutes
      event.update_columns(duration: 60) if event.duration.nil?
    end

    remove_column :events, :date, :date
  end

  def down
    add_column :events, :date, :date

    # Migrate data back from `start_time` to `date`
    Event.reset_column_information
    Event.find_each do |event|
      event.update_columns(date: event.start_time.to_date)
    end

    remove_column :events, :start_time, :datetime
    remove_column :events, :duration, :integer
  end
end
