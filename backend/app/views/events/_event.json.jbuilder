json.extract! event, :id, :creator, :date, :description, :created_at, :updated_at
json.url event_url(event, format: :json)
