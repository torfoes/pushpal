# frozen_string_literal: true

FactoryBot.define do
  factory :notification do
    association :recipient_membership, factory: :membership
    association :creator_membership, factory: :membership
    title { Faker::Lorem.sentence(word_count: 5) }
    message { Faker::Lorem.paragraph }
    sent_at { Faker::Time.backward(days: 7, period: :morning) }
    status { 0 }
    send_type { 0 }
  end
end
