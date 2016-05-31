Rails.application.routes.draw do
  match '*path', via: [:get, :post], :controller => 'application', :action => 'handle_options_request', :constraints => {:method => 'OPTIONS'}

  root 'meteors#index'

  resources :meteors, only: [:index, :create, :show]
  resources :addresses, only: [:index, :create]
  post 'addresses/center_map', :to => 'addresses#center_map'
end
