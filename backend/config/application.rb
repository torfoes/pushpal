# frozen_string_literal: true

require_relative 'boot'
require 'rails/all'

Bundler.require(*Rails.groups)

module Notifyme
  class Application < Rails::Application
    config.load_defaults 7.0
    config.active_record.primary_key = :uuid
    config.api_only = true
    config.time_zone = 'America/Chicago'

    config.generators do |g|
      g.orm :active_record, primary_key_type: :uuid
    end
  end
end
