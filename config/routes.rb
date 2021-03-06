Rails.application.routes.draw do
  root :to => "events#show", id: 5

  get "1" => "events#show", id: 1
  get "2" => "events#show", id: 2
  get "3" => "events#show", id: 3
  get "4" => "events#show", id: 4
  get "5" => "events#show", id: 5
  get "uxeye" => "events#show", id: 4
  get "history" => "histories#index"
  get "history/1" => "histories#show", id: 1
  get "history/2" => "histories#show", id: 2
  get "history/3" => "histories#show", id: 3
  get "history/4" => "histories#show", id: 4

  namespace :admin do
    root :to => "events#index"
    get "/" => "events#index"

    get "logout" => "sessions#destroy", as: "logout"
    get "login" => "sessions#new", as: "login"
    post "login" => "sessions#create"

    get 'stat' => "stats#index", :as => "stat"
    get 'stat_query' => "stats#query", :as => "stat_query"

    match "oauth/callback" => "oauth#callback", :via => :all
    match "oauth/:provider" => "oauth#oauth", :as => :auth_at_provider, :via => :all

    resources :events do
      resources :rooms
      resources :periods do
        resources :programs do
          resources :speakers
        end
      end
      resources :organizer_groups do
        resources :organizers
      end
      resources :organizers
      resources :supporters
    end
    resources :users
  end
end
