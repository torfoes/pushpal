# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    email { Faker::Internet.unique.email }
    name { Faker::Name.name }
    phone_number { Faker::PhoneNumber.phone_number }
    picture { Faker::Avatar.image }
    uin { Faker::Number.number(digits: 10) }
    sub { Faker::Alphanumeric.alphanumeric(number: 10) }
  end
end
