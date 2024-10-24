# spec/requests/organizations_spec.rb

require 'rails_helper'

RSpec.describe 'Organizations API', type: :request do
  # Include helper methods
  include JwtHelper
  include RequestSpecHelper

  # Initialize test data
  let!(:user) { create(:user) }
  let!(:organizations) { create_list(:organization, 5) }

  # Create memberships for each organization with role :member
  before do
    organizations.each do |organization|
      create(:membership, organization: organization, user: user, role: :member)
    end
  end

  # Headers for authenticated requests
  let(:headers) { valid_headers(user) }

  # Headers for unauthenticated requests
  let(:unauthorized_headers) { { 'Authorization' => nil } }

  # Test suite for GET /organizations
  describe 'GET /organizations' do
    context 'when the request is authenticated' do
      before { get '/organizations', headers: headers }

      it 'returns all organizations' do
        expect(json).not_to be_empty
        expect(json.size).to eq(5)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the request is not authenticated' do
      before { get '/organizations', headers: unauthorized_headers }

      it 'returns a 401 unauthorized status' do
        expect(response).to have_http_status(401)
      end

      it 'returns an unauthorized message' do
        expect(json['error']).to match(/Not Authorized/)
      end
    end
  end

  # Test suite for POST /organizations
  describe 'POST /organizations' do
    let(:valid_attributes) { { organization: { name: 'New Organization', description: 'A new organization description' } }.to_json }

    context 'when the request is authenticated' do
      before { post '/organizations', params: valid_attributes, headers: headers }

      it 'creates a new organization' do
        expect(json['name']).to eq('New Organization')
        expect(json['description']).to eq('A new organization description')
      end

      it 'returns status code 201 (created)' do
        expect(response).to have_http_status(201)
      end

      it 'creates a membership for the user with role creator' do
        organization = Organization.find_by(name: 'New Organization')
        membership = Membership.find_by(user: user, organization: organization)
        expect(membership).not_to be_nil
        expect(membership.role).to eq('creator')
      end
    end

    context 'when the request is not authenticated' do
      before { post '/organizations', params: valid_attributes, headers: unauthorized_headers }

      it 'returns a 401 unauthorized status' do
        expect(response).to have_http_status(401)
      end

      it 'does not create a new organization' do
        expect(Organization.count).to eq(5)
      end
    end

    # context 'when the request has invalid parameters' do
    #   let(:invalid_attributes) { { organization: { name: '' } }.to_json }
    #   before { post '/organizations', params: invalid_attributes, headers: headers }
    #
    #   it 'returns a 422 unprocessable entity status' do
    #     expect(response).to have_http_status(422)
    #   end
    #
    #   it 'returns validation failure messages' do
    #     expect(json['errors']).to include("Name can't be blank")
    #   end
    # end
  end

  # # Test suite for DELETE /organizations/:id
  # describe 'DELETE /organizations/:id' do
  #   # To test deletion, we need an organization where the user is an admin (creator)
  #   let!(:admin_organization) { create(:organization, name: 'Admin Org') }
  #   let!(:admin_membership) { create(:membership, organization: admin_organization, user: user, role: :creator) }
  #   let(:organization_id) { admin_organization.id }
  #
  #   context 'when the request is authenticated and user is an admin' do
  #     before { delete "/organizations/#{organization_id}", headers: headers }
  #
  #     it 'deletes the organization' do
  #       expect(Organization.find_by(id: organization_id)).to be_nil
  #     end
  #
  #     it 'returns status code 204 (no content)' do
  #       expect(response).to have_http_status(204)
  #     end
  #   end
  #
  #   context 'when the request is authenticated but user is not an admin' do
  #     # Create an organization where the user is just a member
  #     let!(:member_organization) { create(:organization, name: 'Member Org') }
  #     let!(:member_membership) { create(:membership, organization: member_organization, user: user, role: :member) }
  #
  #     let(:organization_id) { member_organization.id }
  #
  #     before { delete "/organizations/#{organization_id}", headers: headers }
  #
  #     it 'returns a 403 forbidden status' do
  #       expect(response).to have_http_status(403)
  #     end
  #
  #     it 'returns an authorization error message' do
  #       expect(json['error']).to match(/Unauthorized: Admin access required./)
  #     end
  #
  #     it 'does not delete the organization' do
  #       expect(Organization.find_by(id: organization_id)).not_to be_nil
  #     end
  #   end
  #
  #   context 'when the request is not authenticated' do
  #     before { delete "/organizations/#{organization_id}", headers: unauthorized_headers }
  #
  #     it 'returns a 401 unauthorized status' do
  #       expect(response).to have_http_status(401)
  #     end
  #
  #     it 'does not delete the organization' do
  #       expect(Organization.find_by(id: organization_id)).not_to be_nil
  #     end
  #   end
  #
  #   context 'when the organization does not exist' do
  #     let(:organization_id) { 1000 } # Assuming this ID does not exist
  #
  #     before { delete "/organizations/#{organization_id}", headers: headers }
  #
  #     it 'returns a 404 not found status' do
  #       expect(response).to have_http_status(404)
  #     end
  #
  #     it 'returns a not found message' do
  #       expect(json['error']).to match(/Organization not found/)
  #     end
  #   end
  # end
end
