Rails.application.routes.draw do


  get "/postings", to: "postings#index"
  get "/postings/:id", to: "postings#show"
  post "/postings", to: "postings#create"
  delete "/postings", to: "postings#destroy_all"
  delete "/postings/:id", to: "postings#destroy"
  patch "/postings/:id", to: "postings#update"

  get "/jobs", to: "jobs#index"
  get "/jobs/:id", to: "jobs#show"
  post "/jobs", to: "jobs#create"
  patch "/jobs/:id", to: "jobs#update"
  delete "/jobs/:id", to: "jobs#destroy"      

  get "/users", to: "users#index"
  get "/me", to: "users#show"
  post "/users", to: "users#create"
  patch "/users/:id", to: "users#update"
  delete "/users/:id", to: "users#destroy"
  get "/users/:id/jobs", to: "users#show_jobs"
  get "/users/:id/connections", to: "users#show_connections"
  get "/users/:id/interviews", to: "users#show_interviews"


  get "/connections", to: "connections#index"
  get "/connections/:id", to: "connections#show"
  post "/connections", to: "connections#create"
  patch "/connections/:id", to: "connections#update"
  delete "/connections/:id", to: "connections#destroy"

  get "/interviews", to: "interviews#index"
  get "/interviews/:id", to: "interviews#show"
  post "/interviews", to: "interviews#create"
  patch "/interviews/:id", to: "interviews#update"
  delete "/interviews/:id", to: "interviews#destroy"

  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"

  get '/statistics', to: "statistics#index"
  post '/statistics', to: "statistics#create"
  delete '/statistics', to: "statistics#destroy_all"

end               
