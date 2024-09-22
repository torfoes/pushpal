require 'rails_helper'

RSpec.describe Attendance, type: :model do
  it { should belong_to(:membership) }
  it { should belong_to(:event) }

  it { should validate_presence_of(:membership_id) }
  it { should validate_presence_of(:event_id) }

  it 'has a valid factory' do
    expect(create(:attendance)).to be_valid
  end

end
