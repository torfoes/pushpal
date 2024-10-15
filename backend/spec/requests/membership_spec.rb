# spec/requests/memberships_spec.rb

require 'rails_helper'

RSpec.describe 'Memberships API', type: :request do
  # Initialize test data
  let!(:organization) { create(:organization) }
  let!(:user) { create(:user) }
  let!(:membership) { create(:membership, organization: organization, user: user) }

  # Define the base endpoint
  let(:base_endpoint) { "/organizations/#{organization.id}/memberships" }

  # Helper method to parse JSON responses
  def json
    JSON.parse(response.body)
  end

  # Shared examples for unauthorized access
  shared_examples 'unauthorized access' do
    before { send(http_method, endpoint, params: request_params) }

    it 'returns status code 401 Unauthorized' do
      expect(response).to have_http_status(401)
    end

    it 'returns an error message' do
      expect(json['error']).to eq('Token missing')
    end
  end

  # Tests for each endpoint when unauthorized

  describe 'GET /organizations/:organization_id/memberships' do
    let(:http_method) { :get }
    let(:endpoint) { base_endpoint }
    let(:request_params) { {} }

    it_behaves_like 'unauthorized access'
  end

  describe 'GET /organizations/:organization_id/memberships/:id' do
    let(:http_method) { :get }
    let(:endpoint) { "#{base_endpoint}/#{membership.id}" }
    let(:request_params) { {} }

    it_behaves_like 'unauthorized access'
  end

  describe 'GET /organizations/:organization_id/memberships/current' do
    let(:http_method) { :get }
    let(:endpoint) { "#{base_endpoint}/current" }
    let(:request_params) { {} }

    it_behaves_like 'unauthorized access'
  end

  describe 'POST /organizations/:organization_id/memberships' do
    let(:http_method) { :post }
    let(:endpoint) { base_endpoint }
    let(:request_params) do
      {
        membership: {
          user_id: user.id,
          role: 'member'
        }
      }
    end

    it_behaves_like 'unauthorized access'
  end

  describe 'PATCH /organizations/:organization_id/memberships/:id' do
    let(:http_method) { :patch }
    let(:endpoint) { "#{base_endpoint}/#{membership.id}" }
    let(:request_params) do
      {
        membership: {
          role: 'admin'
        }
      }
    end

    it_behaves_like 'unauthorized access'
  end

  describe 'DELETE /organizations/:organization_id/memberships/:id' do
    let(:http_method) { :delete }
    let(:endpoint) { "#{base_endpoint}/#{membership.id}" }
    let(:request_params) { {} }

    it_behaves_like 'unauthorized access'
  end
end
