Rails.application.routes.draw do
  resources :memberships
  resources :dues
  resources :notifications
  resources :attendances
  # resources :events
  resources :organizations do
    resources :events, only: [:index]
  end
  resources :push_subscriptions, path: 'push-subscriptions', only: [:create, :destroy, :index, :show] do
    member do
      post 'send_notification'
    end
  end

  resources :organizations, only: [] do
    member do
      post 'send_push_notifications'
    end
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :users, only: [:create, :index, :show]
  resources :events, only: [:create, :index, :show, :update, :destroy]

  # Defines the root path route ("/")
  # root "articles#index"
end
