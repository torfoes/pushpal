require 'rails_helper'

RSpec.describe Organization, type: :model do
  it { should have_many(:memberships).dependent(:destroy) }
  it { should have_many(:users).through(:memberships) }
  it { should have_many(:events).dependent(:destroy) }
  it { should have_many(:dues).dependent(:destroy) }

  it { should validate_presence_of(:name) }

  it 'has a valid factory' do
    expect(create(:organization)).to be_valid
  end

  describe 'name format' do
    it 'is invalid with an empty name' do
      organization = build(:organization, name: '')
      expect(organization).not_to be_valid
    end

    it 'is valid with a proper name' do
      organization = build(:organization, name: 'Tech Innovators')
      expect(organization).to be_valid
    end
  end
end
