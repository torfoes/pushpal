# # spec/requests/organizations_spec.rb
#
# require 'rails_helper'
#
# RSpec.describe 'Organizations API', type: :request do
#   # Include helper methods
#   include JwtHelper
#   include RequestSpecHelper
#
#   # Initialize test data
#   let!(:user) { create(:user) }
#   let!(:organizations) { create_list(:organization, 5) }
#   let(:organization_id) { organizations.first.id }
#
#   # Headers for authenticated requests
#   let(:headers) { valid_headers(user) }
#   let(:unauthorized_headers) { unauthorized_headers }
#
#   # Test suite for GET /organizations
#   describe 'GET /organizations' do
#     context 'when the request is authenticated' do
#       before { get '/organizations', headers: headers }
#
#       it 'returns all organizations' do
#         expect(json).not_to be_empty
#         expect(json.size).to eq(5)
#       end
#
#       it 'returns status code 200 OK' do
#         expect(response).to have_http_status(:ok)
#       end
#     end
#
#     context 'when the request is not authenticated' do
#       before { get '/organizations', headers: unauthorized_headers }
#
#       it 'returns status code 401 Unauthorized' do
#         expect(response).to have_http_status(:unauthorized)
#       end
#
#       it 'returns a not authorized message' do
#         expect(json['error']).to eq('Not Authorized')
#       end
#     end
#   end
#
#   # Test suite for GET /organizations/:id
#   describe 'GET /organizations/:id' do
#     context 'when the organization exists' do
#       context 'when the request is authenticated' do
#         context 'and the user is a member' do
#           let!(:membership) { create(:membership, user: user, organization: organizations.first, role: :member) }
#
#           before { get "/organizations/#{organization_id}", headers: headers }
#
#           it 'returns the organization with member info' do
#             expect(json).not_to be_empty
#             expect(json['id']).to eq(organization_id)
#             expect(json['members']).not_to be_empty
#           end
#
#           it 'returns status code 200 OK' do
#             expect(response).to have_http_status(:ok)
#           end
#         end
#
#         context 'and the user is not a member' do
#           before { get "/organizations/#{organization_id}", headers: headers }
#
#           it 'returns the organization without member info' do
#             expect(json).not_to be_empty
#             expect(json['id']).to eq(organization_id)
#             expect(json['members']).to be_empty
#           end
#
#           it 'returns status code 200 OK' do
#             expect(response).to have_http_status(:ok)
#           end
#         end
#       end
#
#       context 'when the request is not authenticated' do
#         before { get "/organizations/#{organization_id}", headers: unauthorized_headers }
#
#         it 'returns the organization without member info' do
#           expect(json).not_to be_empty
#           expect(json['id']).to eq(organization_id)
#           expect(json['members']).to be_empty
#         end
#
#         it 'returns status code 200 OK' do
#           expect(response).to have_http_status(:ok)
#         end
#       end
#     end
#
#     context 'when the organization does not exist' do
#       let(:organization_id) { 'non-existent-id' }
#
#       before { get "/organizations/#{organization_id}", headers: headers }
#
#       it 'returns status code 404 Not Found' do
#         expect(response).to have_http_status(:not_found)
#       end
#
#       it 'returns an error message' do
#         expect(json['error']).to eq('Organization not found')
#       end
#     end
#   end
#
#   # Test suite for POST /organizations
#   describe 'POST /organizations' do
#     let(:valid_attributes) do
#       {
#         organization: {
#           name: 'New Organization',
#           description: 'A new organization'
#         }
#       }
#     end
#
#     context 'when the request is authenticated' do
#       context 'and the request is valid' do
#         before { post '/organizations', params: valid_attributes.to_json, headers: headers }
#
#         it 'creates a new organization' do
#           expect(json).not_to be_empty
#           expect(json['name']).to eq('New Organization')
#         end
#
#         it 'returns status code 201 Created' do
#           expect(response).to have_http_status(:created)
#         end
#       end
#
#       context 'and the request is invalid' do
#         let(:invalid_attributes) { { organization: { description: 'No name' } } }
#
#         before { post '/organizations', params: invalid_attributes.to_json, headers: headers }
#
#         it 'returns status code 422 Unprocessable Entity' do
#           expect(response).to have_http_status(:unprocessable_entity)
#         end
#
#         it 'returns validation errors' do
#           expect(json).not_to be_empty
#         end
#       end
#     end
#
#     context 'when the request is not authenticated' do
#       before { post '/organizations', params: valid_attributes.to_json, headers: unauthorized_headers }
#
#       it 'returns status code 401 Unauthorized' do
#         expect(response).to have_http_status(:unauthorized)
#       end
#
#       it 'returns a not authorized message' do
#         expect(json['error']).to eq('Not Authorized')
#       end
#     end
#   end
#
#   # Test suite for PATCH /organizations/:id
#   describe 'PATCH /organizations/:id' do
#     let(:valid_attributes) { { organization: { name: 'Updated Organization' } } }
#
#     context 'when the organization exists' do
#       context 'when the request is authenticated' do
#         context 'and the user is an admin' do
#           let!(:membership) { create(:membership, user: user, organization: organizations.first, role: :creator) }
#
#           before { patch "/organizations/#{organization_id}", params: valid_attributes.to_json, headers: headers }
#
#           it 'updates the organization' do
#             expect(json).not_to be_empty
#             expect(json['name']).to eq('Updated Organization')
#           end
#
#           it 'returns status code 200 OK' do
#             expect(response).to have_http_status(:ok)
#           end
#         end
#
#         context 'and the user is not an admin' do
#           let!(:membership) { create(:membership, user: user, organization: organizations.first, role: :member) }
#
#           before { patch "/organizations/#{organization_id}", params: valid_attributes.to_json, headers: headers }
#
#           it 'returns status code 403 Forbidden' do
#             expect(response).to have_http_status(:forbidden)
#           end
#
#           it 'returns an error message' do
#             expect(json['error']).to eq('Forbidden')
#           end
#         end
#       end
#
#       context 'when the request is not authenticated' do
#         before { patch "/organizations/#{organization_id}", params: valid_attributes.to_json, headers: unauthorized_headers }
#
#         it 'returns status code 401 Unauthorized' do
#           expect(response).to have_http_status(:unauthorized)
#         end
#
#         it 'returns a not authorized message' do
#           expect(json['error']).to eq('Not Authorized')
#         end
#       end
#     end
#
#     context 'when the organization does not exist' do
#       let(:organization_id) { 'non-existent-id' }
#       before { patch "/organizations/#{organization_id}", params: valid_attributes.to_json, headers: headers }
#
#       it 'returns status code 404 Not Found' do
#         expect(response).to have_http_status(:not_found)
#       end
#
#       it 'returns an error message' do
#         expect(json['error']).to eq('Organization not found')
#       end
#     end
#   end
#
#   # Test suite for DELETE /organizations/:id
#   describe 'DELETE /organizations/:id' do
#     context 'when the organization exists' do
#       context 'when the request is authenticated' do
#         context 'and the user is an admin' do
#           let!(:membership) { create(:membership, user: user, organization: organizations.first, role: :creator) }
#
#           before { delete "/organizations/#{organization_id}", headers: headers }
#
#           it 'returns status code 204 No Content' do
#             expect(response).to have_http_status(:no_content)
#           end
#
#           it 'deletes the organization' do
#             expect(Organization.exists?(organization_id)).to be_falsey
#           end
#         end
#
#         context 'and the user is not an admin' do
#           let!(:membership) { create(:membership, user: user, organization: organizations.first, role: :member) }
#
#           before { delete "/organizations/#{organization_id}", headers: headers }
#
#           it 'returns status code 403 Forbidden' do
#             expect(response).to have_http_status(:forbidden)
#           end
#
#           it 'returns an error message' do
#             expect(json['error']).to eq('Forbidden')
#           end
#         end
#       end
#
#       context 'when the request is not authenticated' do
#         before { delete "/organizations/#{organization_id}", headers: unauthorized_headers }
#
#         it 'returns status code 401 Unauthorized' do
#           expect(response).to have_http_status(:unauthorized)
#         end
#
#         it 'returns a not authorized message' do
#           expect(json['error']).to eq('Not Authorized')
#         end
#       end
#     end
#
#     context 'when the organization does not exist' do
#       let(:organization_id) { 'non-existent-id' }
#       before { delete "/organizations/#{organization_id}", headers: headers }
#
#       it 'returns status code 404 Not Found' do
#         expect(response).to have_http_status(:not_found)
#       end
#
#       it 'returns an error message' do
#         expect(json['error']).to eq('Organization not found')
#       end
#     end
#   end
#
#   # Test suite for GET /organizations/mine
#   describe 'GET /organizations/mine' do
#     let!(:membership1) { create(:membership, user: user, organization: organizations.first, role: :member) }
#     let!(:membership2) { create(:membership, user: user, organization: organizations.second, role: :creator) }
#
#     context 'when the request is authenticated' do
#       before { get '/organizations/mine', headers: headers }
#
#       it 'returns the organizations the user is a member of' do
#         expect(json).not_to be_empty
#         expect(json['organizations'].size).to eq(2)
#       end
#
#       it 'returns status code 200 OK' do
#         expect(response).to have_http_status(:ok)
#       end
#     end
#
#     context 'when the request is not authenticated' do
#       before { get '/organizations/mine', headers: unauthorized_headers }
#
#       it 'returns status code 401 Unauthorized' do
#         expect(response).to have_http_status(:unauthorized)
#       end
#
#       it 'returns a not authorized message' do
#         expect(json['error']).to eq('Not Authorized')
#       end
#     end
#   end
# end
