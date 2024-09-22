FactoryBot.define do
  factory :attendance do
    membership
    event
    time { Faker::Time.backward(days: 14, period: :evening) }
    rsvp_status { false }
    checkin_status { false }
    invitation_sent { false }
  end
end
