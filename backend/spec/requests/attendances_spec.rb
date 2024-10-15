# spec/requests/attendances_spec.rb

require 'rails_helper'

RSpec.describe 'Attendances API', type: :request do
  # Initialize test data
  let!(:organization) { create(:organization) }
  let!(:event) { create(:event, organization: organization) }
  let!(:attendance) { create(:attendance, event: event) }

  # Define the base endpoint
  let(:base_endpoint) { "/organizations/#{organization.id}/events/#{event.id}/attendances" }

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

  describe 'GET /organizations/:organization_id/events/:event_id/attendances' do
    let(:http_method) { :get }
    let(:endpoint) { base_endpoint }
    let(:request_params) { {} }

    it_behaves_like 'unauthorized access'
  end

  describe 'GET /organizations/:organization_id/events/:event_id/attendances/:id' do
    let(:http_method) { :get }
    let(:endpoint) { "#{base_endpoint}/#{attendance.id}" }
    let(:request_params) { {} }

    it_behaves_like 'unauthorized access'
  end

  describe 'POST /organizations/:organization_id/events/:event_id/attendances' do
    let(:http_method) { :post }
    let(:endpoint) { base_endpoint }
    let(:request_params) do
      { attendance: { membership_id: attendance.membership_id, rsvp_status: true, checkin_status: false } }
    end

    it_behaves_like 'unauthorized access'
  end

  describe 'PATCH /organizations/:organization_id/events/:event_id/attendances/:id' do
    let(:http_method) { :patch }
    let(:endpoint) { "#{base_endpoint}/#{attendance.id}" }
    let(:request_params) { { attendance: { rsvp_status: false } } }

    it_behaves_like 'unauthorized access'
  end

  describe 'DELETE /organizations/:organization_id/events/:event_id/attendances/:id' do
    let(:http_method) { :delete }
    let(:endpoint) { "#{base_endpoint}/#{attendance.id}" }
    let(:request_params) { {} }

    it_behaves_like 'unauthorized access'
  end

  describe 'POST /organizations/:organization_id/events/:event_id/attendances/:id/toggle_rsvp' do
    let(:http_method) { :post }
    let(:endpoint) { "#{base_endpoint}/#{attendance.id}/toggle_rsvp" }
    let(:request_params) { {} }

    it_behaves_like 'unauthorized access'
  end

  describe 'POST /organizations/:organization_id/events/:event_id/attendances/:id/toggle_checkin' do
    let(:http_method) { :post }
    let(:endpoint) { "#{base_endpoint}/#{attendance.id}/toggle_checkin" }
    let(:request_params) { {} }

    it_behaves_like 'unauthorized access'
  end
end
