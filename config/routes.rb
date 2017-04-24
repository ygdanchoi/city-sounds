Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:index, :show, :create, :update] do
      resources :collections, only: [:index]
    end
    resources :collections, only: [:index, :show, :create, :update, :destroy] do
      resources :sounds, only: [:index]
    end
    resources :sounds, only: [:index, :show, :create, :update, :destroy]
    resource :session, only: [:create, :destroy]
  end
end
