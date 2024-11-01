# frozen_string_literal: true

# spec/requests/push_subscriptions_spec.rb

require 'rails_helper'

RSpec.describe 'PushSubscriptions API', type: :request do
  # Include helper methods
  include JwtHelper
  include RequestSpecHelper

  # Initialize test data
  let!(:user) { create(:user) }
  let!(:push_subscription) { create(:push_subscription, user: user) }

  # Define the endpoint
  let(:endpoint) { '/push-subscriptions' }

  # Headers
  let(:headers) { valid_headers(user) }

  # Shared valid attributes for creating a push subscription
  let(:valid_attributes) do
    {
      push_subscription: {
        endpoint: 'https://example.com/push-service/send/123456',
        p256dh_key: 'BOrQf...exampleP256dhKey...',
        auth_key: 'authKeyExample123456',
        is_bot: false,
        browser_name: 'Chrome',
        browser_version: '89.0',
        engine_name: 'Blink',
        engine_version: '89.0.4389.90',
        os_name: 'Windows',
        os_version: '10',
        device_vendor: 'Dell',
        device_model: 'XPS 15',
        device_type: 'Laptop',
        cpu_architecture: 'x86_64',
        user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...'
      }
    }
  end

  # Shared invalid attributes for creating a push subscription (missing endpoint)
  let(:invalid_attributes) do
    {
      push_subscription: {
        p256dh_key: 'BOrQf...exampleP256dhKey...',
        auth_key: 'authKeyExample123456',
        # endpoint is missing
        is_bot: false,
        browser_name: 'Chrome',
        browser_version: '89.0',
        engine_name: 'Blink',
        engine_version: '89.0.4389.90',
        os_name: 'Windows',
        os_version: '10',
        device_vendor: 'Dell',
        device_model: 'XPS 15',
        device_type: 'Laptop',
        cpu_architecture: 'x86_64',
        user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...'
      }
    }
  end

  # ===========================
  # Tests for GET /push-subscriptions
  # ===========================
  describe 'GET /push-subscriptions' do
    context 'when the request is unauthorized' do
      before { get endpoint, headers: unauthorized_headers }

      it 'returns status code 401 Unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns an error message' do
        expect(json['error']).to eq('Not Authorized')
      end

      it 'does not return any push subscriptions' do
        expect(json['subscriptions']).to be_nil
      end
    end

    context 'when the request is authorized' do
      before { get endpoint, headers: headers }

      it 'returns status code 200 OK' do
        expect(response).to have_http_status(:ok)
      end

      it 'returns all push subscriptions for the user' do
        expect(json['success']).to be true
        expect(json['subscriptions']).not_to be_empty
        expect(json['subscriptions'].size).to eq(1)
        expect(json['subscriptions'][0]['endpoint']).to eq(push_subscription.endpoint)
      end
    end
  end

  # ===========================
  # Tests for POST /push-subscriptions
  # ===========================
  describe 'POST /push-subscriptions' do
    context 'when the request is unauthorized' do
      before { post endpoint, params: valid_attributes.to_json, headers: unauthorized_headers }

      it 'returns status code 401 Unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns an error message' do
        expect(json['error']).to eq('Not Authorized')
      end
    end

    context 'when the request is authorized' do
      context 'with valid attributes' do
        before { post endpoint, params: valid_attributes.to_json, headers: headers }

        it 'creates a new push subscription' do
          expect(json['success']).to be true
          expect(json['subscription']).not_to be_nil
          expect(json['subscription']['endpoint']).to eq(valid_attributes[:push_subscription][:endpoint])
        end

        it 'returns status code 201 Created' do
          expect(response).to have_http_status(:created)
        end
      end

      context 'with invalid attributes' do
        before { post endpoint, params: invalid_attributes.to_json, headers: headers }

        it 'does not create a new push subscription' do
          expect(json['success']).to be false
          expect(json['errors']).to include("Endpoint can't be blank")
        end

        it 'returns status code 422 Unprocessable Entity' do
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end

      context 'when the subscription already exists' do
        before do
          # Create a subscription with the same endpoint
          create(:push_subscription, user: user, endpoint: valid_attributes[:push_subscription][:endpoint])
          post endpoint, params: valid_attributes.to_json, headers: headers
        end

        it 'does not create a duplicate subscription' do
          expect(json['success']).to be true
          expect(json['subscription']['endpoint']).to eq(valid_attributes[:push_subscription][:endpoint])
        end

        it 'returns status code 201 Created' do
          expect(response).to have_http_status(:created)
        end
      end
    end
  end

  # ===========================
  # Tests for DELETE /push-subscriptions/:endpoint
  # ===========================
  describe 'DELETE /push-subscriptions/:endpoint' do
    let(:subscription_endpoint_value) { push_subscription.endpoint }
    let(:delete_endpoint) { "#{endpoint}/#{CGI.escape(subscription_endpoint_value)}" }

    context 'when the request is unauthorized' do
      before { delete delete_endpoint, headers: unauthorized_headers }

      it 'returns status code 401 Unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns an error message' do
        expect(json['error']).to eq('Not Authorized')
      end
    end

    context 'when the request is authorized' do
      context 'when the subscription exists' do
        before { delete delete_endpoint, headers: headers }

        it 'deletes the subscription' do
          expect(json['success']).to be true
          expect(json['message']).to eq('Unsubscribed successfully.')
        end

        it 'returns status code 200 OK' do
          expect(response).to have_http_status(:ok)
        end

        it 'actually removes the subscription from the database' do
          expect(PushSubscription.find_by(endpoint: subscription_endpoint_value)).to be_nil
        end
      end

      context 'when the subscription does not exist' do
        # Generate a random endpoint that does not exist in the database
        let(:non_existent_endpoint) { 'https://example.com/non-existent-endpoint' }
        let(:delete_endpoint) { "#{endpoint}/#{CGI.escape(non_existent_endpoint)}" }

        before { delete delete_endpoint, headers: headers }

        it 'returns status code 404 Not Found' do
          expect(response).to have_http_status(:not_found)
        end

        it 'returns an error message' do
          expect(json['success']).to be false
          expect(json['errors']).to include('Subscription not found')
        end
      end
    end
  end

  # ===========================
  # Tests for POST /push-subscriptions/:endpoint/send_notification
  # ===========================
  describe 'POST /push-subscriptions/:endpoint/send_notification' do
    let(:subscription_endpoint_value) { push_subscription.endpoint }
    let(:send_notification_endpoint) { "#{endpoint}/#{CGI.escape(subscription_endpoint_value)}/send_notification" }
    let(:notification_params) do
      {
        notification: {
          title: 'Test Notification',
          body: 'This is a test push notification.',
          data: { key: 'value' }
        }
      }
    end

    context 'when the request is unauthorized' do
      before { post send_notification_endpoint, params: notification_params.to_json, headers: unauthorized_headers }

      it 'returns status code 401 Unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns an error message' do
        expect(json['error']).to eq('Not Authorized')
      end
    end

    context 'when the request is authorized' do
      context 'when the subscription exists' do
        context 'when the notification is sent successfully' do
          before do
            # Mock the PushNotificationService to return a successful result
            allow_any_instance_of(PushNotificationService).to receive(:send_notification).and_return({ success: true })
            post send_notification_endpoint, params: notification_params.to_json, headers: headers
          end

          it 'sends the notification' do
            expect(json['success']).to be true
            expect(json['message']).to eq('Push notification sent successfully.')
          end

          it 'returns status code 200 OK' do
            expect(response).to have_http_status(:ok)
          end
        end

        context 'when the notification fails to send' do
          before do
            # Mock the PushNotificationService to return a failure result
            allow_any_instance_of(PushNotificationService).to receive(:send_notification).and_return({ success: false, error: 'Failed to send notification.' })
            post send_notification_endpoint, params: notification_params.to_json, headers: headers
          end

          it 'does not send the notification' do
            expect(json['success']).to be false
            expect(json['error']).to eq('Failed to send notification.')
          end

          it 'returns status code 422 Unprocessable Entity' do
            expect(response).to have_http_status(:unprocessable_entity)
          end
        end
      end

      context 'when the subscription does not exist' do
        let(:non_existent_endpoint) { 'https://example.com/non-existent-endpoint' }
        let(:send_notification_endpoint) { "#{endpoint}/#{CGI.escape(non_existent_endpoint)}/send_notification" }

        before { post send_notification_endpoint, params: notification_params.to_json, headers: headers }

        it 'returns status code 404 Not Found' do
          expect(response).to have_http_status(:not_found)
        end

        it 'returns an error message' do
          expect(json['success']).to be false
          expect(json['errors']).to include('Subscription not found.')
        end
      end
    end
  end

  # ===========================
  # Additional Tests for SHOW and VIEW
  # ===========================
  describe 'GET /push-subscriptions/:endpoint' do
    let(:subscription_endpoint_value) { push_subscription.endpoint }
    let(:show_endpoint) { "#{endpoint}/#{CGI.escape(subscription_endpoint_value)}" }

    context 'when the request is unauthorized' do
      before { get show_endpoint, headers: unauthorized_headers }

      it 'returns status code 401 Unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns an error message' do
        expect(json['error']).to eq('Not Authorized')
      end
    end

    context 'when the request is authorized' do
      context 'when the subscription exists' do
        before { get show_endpoint, headers: headers }

        it 'returns the subscription' do
          expect(json['success']).to be true
          expect(json['subscription']).not_to be_nil
          expect(json['subscription']['endpoint']).to eq(subscription_endpoint_value)
        end

        it 'returns status code 200 OK' do
          expect(response).to have_http_status(:ok)
        end
      end

      context 'when the subscription does not exist' do
        let(:non_existent_endpoint) { 'https://example.com/non-existent-endpoint' }
        let(:show_endpoint) { "#{endpoint}/#{CGI.escape(non_existent_endpoint)}" }

        before { get show_endpoint, headers: headers }

        it 'returns status code 404 Not Found' do
          expect(response).to have_http_status(:not_found)
        end

        it 'returns an error message' do
          expect(json['success']).to be false
          expect(json['errors']).to include('Subscription not found')
        end
      end
    end
  end

  describe 'GET /push-subscriptions/:endpoint/view' do
    let(:subscription_endpoint_value) { push_subscription.endpoint }
    let(:view_endpoint) { "#{endpoint}/#{CGI.escape(subscription_endpoint_value)}/view" }

    context 'when the request is unauthorized' do
      before { get view_endpoint, headers: unauthorized_headers }

      it 'returns status code 401 Unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'returns an error message' do
        expect(json['error']).to eq('Not Authorized')
      end
    end

    context 'when the request is authorized' do
      context 'when the subscription exists' do
        before { get view_endpoint, headers: headers }

        it 'returns the subscription' do
          expect(json['success']).to be true
          expect(json['subscription']).not_to be_nil
          expect(json['subscription']['endpoint']).to eq(subscription_endpoint_value)
        end

        it 'returns status code 200 OK' do
          expect(response).to have_http_status(:ok)
        end
      end

      context 'when the subscription does not exist' do
        let(:non_existent_endpoint) { 'https://example.com/non-existent-endpoint' }
        let(:view_endpoint) { "#{endpoint}/#{CGI.escape(non_existent_endpoint)}/view" }

        before { get view_endpoint, headers: headers }

        it 'returns status code 404 Not Found' do
          expect(response).to have_http_status(:not_found)
        end

        it 'returns an error message' do
          expect(json['success']).to be false
          expect(json['errors']).to include('Subscription not found.')
        end
      end
    end
  end
end
