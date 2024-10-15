# frozen_string_literal: true

FactoryBot.define do
  factory :organization do
    name { Faker::Company.unique.name }
    description { Faker::Lorem.paragraph }
  end
end
