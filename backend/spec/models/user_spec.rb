# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  subject { create(:user) }
  it { should have_many(:memberships).dependent(:destroy) }
  it { should have_many(:organizations).through(:memberships) }
  it { should have_many(:push_subscriptions).dependent(:destroy) }

  it { should validate_presence_of(:email) }
  it { should validate_uniqueness_of(:email).ignoring_case_sensitivity }

  it 'has a valid factory' do
    expect(create(:user)).to be_valid
  end
end
