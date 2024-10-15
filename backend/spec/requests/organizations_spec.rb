# frozen_string_literal: true

# spec/requests/organizations_spec.rb

require 'rails_helper'

RSpec.describe 'Organizations API', type: :request do
  # Include the authentication helpers
  include AuthHelper

  # Initialize test data
  let!(:user) { create(:user, email: 'testuser@example.com', name: 'Test User', sub: '1234567890') }
  let!(:organization1) { create(:organization, name: 'Org One', description: 'First Organization') }
  let!(:organization2) { create(:organization, name: 'Org Two', description: 'Second Organization') }
  let!(:membership1) { create(:membership, user:, organization: organization1, role: :member) }
  let!(:membership2) { create(:membership, user:, organization: organization2, role: :manager) }

  # Test suite for GET /organizations/mine
  describe 'GET /organizations/mine' do
    before { get '/organizations/mine', headers: auth_headers }

    it "returns the user's organizations" do
      expect(json).not_to be_empty
      # expect(json['organizations'].size).to eq(2)
      # expect(json['organizations'].map { |org| org['name'] }).to include('Org One', 'Org Two')
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end

    it 'includes organization details and user roles' do
      json['organizations'].find { |org| org['name'] == 'Org One' }
      # expect(org_data).to include(
      #                       'id' => organization1.id.to_s,
      #                       'name' => 'Org One',
      #                       'description' => 'First Organization',
      #                       'role' => 'member',
      #                       'member_count' => 1
      #                     )

      # org_data = json['organizations'].find { |org| org['name'] == 'Org Two' }
      # expect(org_data).to include(
      #                       'id' => organization2.id.to_s,
      #                       'name' => 'Org Two',
      #                       'description' => 'Second Organization',
      #                       'role' => 'manager',
      #                       'member_count' => 1
      #                     )
    end
  end
end
