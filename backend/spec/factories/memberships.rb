FactoryBot.define do
  factory :membership do
    user
    organization
    role  { Membership.roles.keys.sample }
  end
end