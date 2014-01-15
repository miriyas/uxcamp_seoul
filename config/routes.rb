Rails.application.routes.draw do
	namespace :admin do
    root :to => "events#index"
	
	  get "logout" => "sessions#destroy", as: "logout"
	  get "login" => "sessions#new", as: "login"
    post "login" => "sessions#create"

		get 'stat' => "stats#index", :as => "stat"
		get 'stat_query' => "stats#query", :as => "stat_query"

		resources :events
		resources :users
	end  
end