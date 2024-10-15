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
      resources :attendances do
        member do
          post 'toggle_rsvp'
          post 'toggle_checkin'
        end
      end
    end

    resources :notifications, only: %i[index create show update destroy]

    member do
      post 'send_push_notifications'
    end
  end

  resources :push_subscriptions, path: 'push-subscriptions', only: %i[create destroy index show] do
    member do
      post 'send_notification'
    end
  end

  resources :users, only: %i[create index show]
end
