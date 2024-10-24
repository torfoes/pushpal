# frozen_string_literal: true

FactoryBot.define do
  factory :event do
    association :creator_membership, factory: :membership
    association :organization

    name { Faker::Lorem.sentence(word_count: 3) }
    start_time { Time.now + 1.day }
    duration { 60 }
    description { Faker::Lorem.paragraph }
  end
end
