# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Notification, type: :model do
  it { should belong_to(:creator_membership).class_name('Membership') }

  it { should validate_presence_of(:creator_membership) }
  it { should validate_presence_of(:send_type) }
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:message) }
  it { should validate_presence_of(:status) }

  it 'has a valid factory' do
    expect(create(:notification)).to be_valid
  end
end
