# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PushSubscription, type: :model do
  it { should belong_to(:user) }

  it { should validate_presence_of(:user_id) }
  it { should validate_presence_of(:endpoint) }
  it { should validate_presence_of(:auth_key) }
  it { should validate_presence_of(:p256dh_key) }
  # it { should validate_uniqueness_of(:endpoint) }

  it 'has a valid factory' do
    expect(create(:push_subscription)).to be_valid
  end
end
