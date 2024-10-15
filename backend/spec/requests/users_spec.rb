# spec/requests/users_spec.rb

require 'rails_helper'

RSpec.describe 'Users API', type: :request do
  # Initialize test data
  let!(:user) { create(:user) }

  # Define the base endpoint
  let(:base_endpoint) { '/users' }

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

  describe 'GET /users' do
    let(:http_method) { :get }
    let(:endpoint) { base_endpoint }
    let(:request_params) { {} }

    it_behaves_like 'unauthorized access'
  end

  describe 'GET /users/:id' do
    let(:http_method) { :get }
    let(:endpoint) { "#{base_endpoint}/#{user.id}" }
    let(:request_params) { {} }

    it_behaves_like 'unauthorized access'
  end

  describe 'POST /users' do
    let(:http_method) { :post }
    let(:endpoint) { base_endpoint }
    let(:request_params) do
      {
        user: {
          email: 'newuser@example.com',
          password: 'password',
          password_confirmation: 'password',
          uin: '123456789',
          name: 'New User'
        }
      }
    end

    it_behaves_like 'unauthorized access'
  end
end
