# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Due, type: :model do
  it { should belong_to(:membership) }
  it { should belong_to(:organization) }

  it { should validate_presence_of(:membership_id) }
  it { should validate_presence_of(:organization_id) }
  it { should validate_presence_of(:amount) }
  it { should validate_presence_of(:date) }
  it { should validate_presence_of(:status) }

  it 'has a valid factory' do
    expect(create(:due)).to be_valid
  end
end
