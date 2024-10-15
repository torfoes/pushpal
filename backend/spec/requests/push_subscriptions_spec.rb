# frozen_string_literal: true

# spec/requests/push_subscriptions_spec.rb

require 'rails_helper'

RSpec.describe 'PushSubscriptions API', type: :request do
  # Initialize test data
  let!(:user) { create(:user) }
  let!(:push_subscription) { create(:push_subscription, user:) }

  # Define the endpoint
  let(:endpoint) { '/push-subscriptions' }

  # Rainy Day Test: Accessing index without Authorization header
  describe 'GET /push-subscriptions' do
    context 'when the request is unauthorized' do
      before { get endpoint }

      it 'returns status code 401 Unauthorized' do
        expect(response).to have_http_status(401)
      end

      it 'returns an error message' do
        expect(json['error']).to eq('Token missing')
      end

      it 'does not return any push subscriptions' do
        expect(json['subscriptions']).to be_nil
      end
    end
  end
end
