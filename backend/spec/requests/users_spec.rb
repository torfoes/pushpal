# spec/requests/users_spec.rb

require 'rails_helper'

RSpec.describe 'Users API', type: :request do
  # Include helper methods
  include JwtHelper
  include RequestSpecHelper

  # Initialize test data
  let!(:users) { create_list(:user, 5) }
  let(:user) { users.first }
  let(:user_id) { user.id }

  # Headers for authenticated requests
  let(:headers) { valid_headers(user) }

  # Test suite for GET /users
  describe 'GET /users' do
    context 'when the request is authenticated' do
      before { get '/users', headers: headers }

      it 'returns all users' do
        expect(json).not_to be_empty
        expect(json.size).to eq(5)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(:ok)
      end
    end

    context 'when the request is not authenticated' do
      before { get '/users', headers: unauthorized_headers }

      it 'returns status code 401 Unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns a not authorized message' do
        expect(json['error']).to eq('Not Authorized')
      end
    end
  end

  # Test suite for GET /users/:id
  describe 'GET /users/:id' do
    context 'when the request is authenticated' do
      context 'and the user exists' do
        before { get "/users/#{user_id}", headers: headers }

        it 'returns the user' do
          expect(json).not_to be_empty
          expect(json['id']).to eq(user_id)
        end

        it 'returns status code 200' do
          expect(response).to have_http_status(:ok)
        end
      end

      context 'and the user does not exist' do
        let(:user_id) { 'non-existent-id' }
        before { get "/users/#{user_id}", headers: headers }

        it 'returns status code 404 Not Found' do
          expect(response).to have_http_status(:not_found)
        end

        it 'returns a not found message' do
          expect(json['error']).to eq('User not found')
        end
      end
    end

    context 'when the request is not authenticated' do
      before { get "/users/#{user_id}", headers: unauthorized_headers }

      it 'returns status code 401 Unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns a not authorized message' do
        expect(json['error']).to eq('Not Authorized')
      end
    end
  end

  # Test suite for POST /users
  describe 'POST /users' do
    let(:valid_attributes) do
      {
        user: {
          email: 'newuser@example.com',
          name: 'New User',
          uin: '123456789',
          picture: 'http://example.com/picture.jpg',
          sub: 'google-uid-12345' # Changed from uid to sub
        }
      }
    end

    context 'when the request is valid' do
      before { post '/users', params: valid_attributes.to_json, headers: { 'Content-Type' => 'application/json' } }

      it 'creates a new user' do
        expect(json['message']).to eq('User created successfully')
      end

      it 'returns status code 201 Created' do
        expect(response).to have_http_status(:created)
      end
    end

    context 'when the request is invalid' do
      let(:invalid_attributes) do
        {
          user: {
            email: '',
            name: 'New User',
            uin: '123456789'
          }
        }
      end
      before { post '/users', params: invalid_attributes.to_json, headers: { 'Content-Type' => 'application/json' } }

      it 'returns status code 422 Unprocessable Entity' do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns validation errors' do
        expect(json['errors']).to include("Email can't be blank")
      end
    end
  end
end
