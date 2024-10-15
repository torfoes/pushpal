# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Event, type: :model do
  it { should belong_to(:creator_membership).class_name('Membership') }
  it { should belong_to(:organization) }
  it { should have_many(:attendances).dependent(:destroy) }

  it { should validate_presence_of(:creator_membership_id) }
  it { should validate_presence_of(:organization_id) }
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:date) }

  it 'has a valid factory' do
    expect(create(:event)).to be_valid
  end
end
