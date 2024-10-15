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

  # Single test for the index action with authenticated request
  describe 'GET /users' do
    context 'when the request is authenticated' do
      it 'returns all users with status code 200' do
        # Generate JWT for the user
        token = generate_encrypted_jwt(user)

        # Set the Authorization header
        headers = { 'Authorization' => "Bearer #{token}" }

        # Make the GET request to /users with headers
        get base_endpoint, headers: headers

        # Expectations
        expect(response).to have_http_status(:ok)
        expect(json).not_to be_empty
        expect(json.size).to eq(User.count)
        expect(json.first['email']).to eq(user.email)
      end
    end

    context 'when the request is not authenticated' do
      it 'returns status code 401 Unauthorized' do
        get base_endpoint

        # Expectations
        expect(response).to have_http_status(:unauthorized)
        expect(json['error']).to eq('Token missing')
      end
    end
  end
end
