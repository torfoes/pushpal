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
          collection do
            get 'current'  # Add this route to fetch the current user's attendance
          end
        end
    end

    resources :notifications, only: [:index, :create, :show, :update, :destroy]

    member do
      post 'send_push_notifications'
    end
  end

  resources :push_subscriptions, path: 'push-subscriptions', only: [:create, :destroy, :index, :show] do
      member do
        post 'send_notification'
      end
    end

  resources :users, only: [:create, :index, :show]
end
