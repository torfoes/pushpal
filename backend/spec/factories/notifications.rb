FactoryBot.define do
  factory :notification do
    association :recipient_membership, factory: :membership
    association :creator_membership, factory: :membership
    send_type { 0 }
    title { Faker::Lorem.sentence(word_count: 5) }
    message { Faker::Lorem.paragraph }
    sent_at { Faker::Time.backward(days: 7, period: :morning) }
    status { 0 }
  end
end
