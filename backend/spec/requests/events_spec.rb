# frozen_string_literal: true

# # spec/requests/events_spec.rb
# require 'rails_helper'
#
# RSpec.describe 'Events API', type: :request do
#   # Include helper methods
#   include JwtHelper
#   include RequestSpecHelper
#
#   # Create necessary records
#   let!(:organization) { create(:organization) }
#   let!(:user) { create(:user) }
#   let!(:membership) { create(:membership, organization: organization, user: user) }
#   let!(:event) { create(:event, organization: organization, creator_membership: membership) }
#
#   let(:base_endpoint) { "/organizations/#{organization.id}/events" }
#
#   # Generate valid headers with authentication token
#   let(:headers) { valid_headers(user) }
#
#   # Shared variable for endpoints
#   let(:event_id) { event.id }
#
#   # Helper method to parse JSON responses
#   def json_response
#     JSON.parse(response.body)
#   end
#
#   # -------------------
#   # Test Suite for GET /organizations/:organization_id/events
#   # -------------------
#   describe 'GET /organizations/:organization_id/events' do
#     context 'when the organization exists' do
#       before { get base_endpoint, headers: headers }
#
#       it 'returns all events for the organization' do
#         expect(json_response).not_to be_empty
#         expect(json_response.size).to eq(1)
#         expect(json_response.first['id']).to eq(event_id)
#       end
#
#       it 'returns status code 200' do
#         expect(response).to have_http_status(200)
#       end
#     end
#
#     context 'when the organization does not exist' do
#       let(:base_endpoint) { "/organizations/9999/events" } # Assuming ID 9999 doesn't exist
#
#       before { get base_endpoint, headers: headers }
#
#       it 'returns a not found message' do
#         expect(response.body).to match(/Organization not found/)
#       end
#
#       it 'returns status code 404' do
#         expect(response).to have_http_status(404)
#       end
#     end
#   end
#
#   # -------------------
#   # Test Suite for GET /organizations/:organization_id/events/:id
#   # -------------------
#   describe 'GET /organizations/:organization_id/events/:id' do
#     context 'when the event exists' do
#       before { get "#{base_endpoint}/#{event_id}", headers: headers }
#
#       it 'returns the event' do
#         expect(json_response).not_to be_empty
#         expect(json_response['id']).to eq(event_id)
#         expect(json_response['name']).to eq(event.name)
#       end
#
#       it 'returns status code 200' do
#         expect(response).to have_http_status(200)
#       end
#     end
#
#     context 'when the event does not exist' do
#       let(:event_id) { 9999 } # Assuming ID 9999 doesn't exist
#
#       before { get "#{base_endpoint}/#{event_id}", headers: headers }
#
#       it 'returns an error message' do
#         expect(response.body).to match(/Event not found/)
#       end
#
#       it 'returns status code 404' do
#         expect(response).to have_http_status(404)
#       end
#     end
#   end
#
#   # -------------------
#   # Test Suite for POST /organizations/:organization_id/events
#   # -------------------
#   describe 'POST /organizations/:organization_id/events' do
#     let(:valid_attributes) do
#       {
#         event: {
#           name: "New Event",
#           description: "This is a new event.",
#           start_time: Time.current + 2.days,
#           duration: 90,
#           attendance_required: true
#         }
#       }.to_json
#     end
#
#     let(:invalid_attributes) do
#       {
#         event: {
#           name: nil, # Name is required
#           description: "Invalid event without a name.",
#           start_time: Time.current + 2.days,
#           duration: 90,
#           attendance_required: true
#         }
#       }.to_json
#     end
#
#     context 'when the request is valid' do
#       before { post base_endpoint, params: valid_attributes, headers: headers }
#
#       it 'creates a new event' do
#         expect(json_response['name']).to eq('New Event')
#         expect(json_response['description']).to eq('This is a new event.')
#         expect(json_response['organization_id']).to eq(organization.id)
#         expect(json_response['creator_membership_id']).to eq(membership.id)
#       end
#
#       it 'returns status code 201 (Created)' do
#         expect(response).to have_http_status(201)
#       end
#     end
#
#     context 'when the request is invalid' do
#       before { post base_endpoint, params: invalid_attributes, headers: headers }
#
#       it 'returns a validation failure message' do
#         expect(response.body).to match(/Name can't be blank/)
#         expect(json_response['errors']).to include("Name can't be blank")
#       end
#
#       it 'returns status code 422 (Unprocessable Entity)' do
#         expect(response).to have_http_status(422)
#       end
#     end
#   end
#
#   # -------------------
#   # Test Suite for PUT /organizations/:organization_id/events/:id
#   # -------------------
#   describe 'PUT /organizations/:organization_id/events/:id' do
#     let(:valid_attributes) do
#       {
#         event: {
#           name: "Updated Event Name",
#           description: "Updated description."
#         }
#       }.to_json
#     end
#
#     let(:invalid_attributes) do
#       {
#         event: {
#           name: nil # Name is required
#         }
#       }.to_json
#     end
#
#     context 'when the event exists and the request is valid' do
#       before { put "#{base_endpoint}/#{event_id}", params: valid_attributes, headers: headers }
#
#       it 'updates the event' do
#         expect(json_response['name']).to eq('Updated Event Name')
#         expect(json_response['description']).to eq('Updated description.')
#       end
#
#       it 'returns status code 200 (OK)' do
#         expect(response).to have_http_status(200)
#       end
#     end
#
#     context 'when the event exists but the request is invalid' do
#       before { put "#{base_endpoint}/#{event_id}", params: invalid_attributes, headers: headers }
#
#       it 'returns a validation failure message' do
#         expect(response.body).to match(/Name can't be blank/)
#         expect(json_response['errors']).to include("Name can't be blank")
#       end
#
#       it 'returns status code 422 (Unprocessable Entity)' do
#         expect(response).to have_http_status(422)
#       end
#     end
#
#     context 'when the event does not exist' do
#       let(:event_id) { 9999 } # Assuming ID 9999 doesn't exist
#
#       before { put "#{base_endpoint}/#{event_id}", params: valid_attributes, headers: headers }
#
#       it 'returns an error message' do
#         expect(response.body).to match(/Event not found/)
#       end
#
#       it 'returns status code 404 (Not Found)' do
#         expect(response).to have_http_status(404)
#       end
#     end
#   end
#
#   # -------------------
#   # Test Suite for DELETE /organizations/:organization_id/events/:id
#   # -------------------
#   describe 'DELETE /organizations/:organization_id/events/:id' do
#     context 'when the event exists' do
#       before { delete "#{base_endpoint}/#{event_id}", headers: headers }
#
#       it 'deletes the event' do
#         expect(response).to have_http_status(204)
#         expect { Event.find(event_id) }.to raise_error(ActiveRecord::RecordNotFound)
#       end
#     end
#
#     context 'when the event does not exist' do
#       let(:event_id) { 9999 } # Assuming ID 9999 doesn't exist
#
#       before { delete "#{base_endpoint}/#{event_id}", headers: headers }
#
#       it 'returns an error message' do
#         expect(response.body).to match(/Unauthorized: Admin access required./)
#       end
#
#       it 'returns status code 404 (Not Found)' do
#         expect(response).to have_http_status(404)
#       end
#     end
#   end
# end
