require 'rails_helper'

RSpec.describe Membership, type: :model do
  it { should belong_to(:user) }
  it { should belong_to(:organization) }
  it { should have_many(:attendances).dependent(:destroy) }
  it { should have_many(:notifications_as_creator).class_name('Notification').with_foreign_key('creator_membership_id').dependent(:destroy) }
  it { should have_many(:notifications_as_recipient).class_name('Notification').with_foreign_key('recipient_membership_id').dependent(:destroy) }

  it { should validate_presence_of(:user_id) }
  it { should validate_presence_of(:organization_id) }
  it { should validate_presence_of(:role) }

  it 'has a valid factory' do
    expect(create(:membership)).to be_valid
  end

end
