# frozen_string_literal: true

# config/routes.rb

Rails.application.routes.draw do
  resources :organizations do
    collection do
      get 'mine'
    end

    resources :memberships do
      collection do
        get 'current'
      end
    end

    resources :events do
      collection do
        get 'upcoming'
      end

      resources :attendances do
        member do
          post 'toggle_rsvp'
          post 'toggle_checkin'
          post 'check_in'
        end
      end
    end

    resources :notifications, only: %i[index create show update destroy] do
      collection do
        get 'recent'
      end
    end
  end

  resources :push_subscriptions, path: 'push-subscriptions', param: :endpoint, constraints: { endpoint: /.+/ }, only: %i[create destroy index show] do
    member do
      get 'view'
      post 'send_notification'
    end
  end

  resources :users, only: %i[create index show]
end
