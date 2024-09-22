# spec/factories_spec.rb

require 'rails_helper'

RSpec.describe 'Factories' do
  it 'has a valid user factory' do
    expect(create(:user)).to be_valid
  end

  it 'has a valid organization factory' do
    expect(create(:organization)).to be_valid
  end

  it 'has a valid membership factory' do
    expect(create(:membership)).to be_valid
  end

  it 'has a valid event factory' do
    expect(create(:event)).to be_valid
  end

  it 'has a valid attendance factory' do
    expect(create(:attendance)).to be_valid
  end

  it 'has a valid due factory' do
    expect(create(:due)).to be_valid
  end

  it 'has a valid notification factory' do
    expect(create(:notification)).to be_valid
  end

  it 'has a valid push_subscription factory' do
    expect(create(:push_subscription)).to be_valid
  end
end
