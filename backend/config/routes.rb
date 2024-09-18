Rails.application.routes.draw do
  resources :memberships
  resources :dues
  resources :notifications
  resources :attendances
  resources :events
  resources :organizations
  resources :push_subscriptions, path: 'push-subscriptions', only: [:create, :destroy, :index, :show]

  resources :organizations, only: [] do
    member do
      post 'send_push_notifications'
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :users, only: [:create, :index, :show]

  # Defines the root path route ("/")
  # root "articles#index"
end
