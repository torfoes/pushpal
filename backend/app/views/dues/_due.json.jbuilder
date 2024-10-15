# frozen_string_literal: true

json.extract! due, :id, :user, :date, :amount, :payment_id, :status, :semester, :created_at, :updated_at
json.url due_url(due, format: :json)
