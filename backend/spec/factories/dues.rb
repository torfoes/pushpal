FactoryBot.define do
  factory :due do
    membership
    date { Faker::Date.backward(days: 365) }
    amount { Faker::Commerce.price(range: 10.0..100.0) }
    payment_id { Faker::Alphanumeric.alphanumeric(number: 12) }
    status { 0 } # Adjust based on your enum or status definitions
    organization
    semester { "Fall 2024" } # Adjust as needed
  end
end
