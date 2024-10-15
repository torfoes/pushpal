# frozen_string_literal: true

json.extract! attendance, :id, :user, :event, :time, :status, :created_at, :updated_at
json.url attendance_url(attendance, format: :json)
