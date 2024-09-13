Rails.application.routes.draw do
  resources :memberships
  resources :dues
  resources :notifications
  resources :attendances
  resources :events
  resources :organizations
  resources :push_subscriptions, only: [:create]

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :users, only: [:create, :index, :show]

  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'

  # Defines the root path route ("/")
  # root "articles#index"
end
