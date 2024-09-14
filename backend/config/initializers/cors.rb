Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    if Rails.env.development?
      origins '*'
    else
      origins ENV.fetch('ALLOWED_ORIGINS', '').split(',')
    end

    resource '*',
             headers: :any,
             methods: [:get, :post, :put, :patch, :delete, :options, :head],
             expose: ['Authorization'], # Expose specific headers if needed
             max_age: 600
  end
end
