# frozen_string_literal: true

FactoryBot.define do
  factory :push_subscription do
    user
    endpoint { Faker::Internet.unique.url(host: 'example.com') }
    auth_key { Faker::Alphanumeric.alphanumeric(number: 16) }
    p256dh_key { Faker::Alphanumeric.alphanumeric(number: 16) }
    device_info { Faker::Device.model_name }
    is_bot { false }
    browser_name { %w[Chrome Firefox Safari Edge Opera].sample }
    browser_version { Faker::Number.decimal(l_digits: 1, r_digits: 2) }
    device_model { Faker::Device.model_name }
    device_type { %w[Mobile Tablet Desktop Laptop Smartwatch].sample }
    device_vendor { Faker::Device.manufacturer }
    engine_name { 'Blink' }
    engine_version { Faker::Number.decimal(l_digits: 1, r_digits: 2) }
    os_name { %w[Windows macOS Linux Android iOS].sample }
    os_version { Faker::Number.decimal(l_digits: 1, r_digits: 2) }
    cpu_architecture { 'x86_64' }
    user_agent { Faker::Internet.user_agent }
    last_used_at { Faker::Time.backward(days: 1) }
  end
end
