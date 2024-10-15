# frozen_string_literal: true

FactoryBot.define do
  factory :event do
    association :creator_membership, factory: :membership
    name { Faker::Lorem.sentence(word_count: 3) }
    date { Faker::Date.forward(days: 30) }
    description { Faker::Lorem.paragraph }
    organization
  end
end
