Rails.application.routes.draw do
  root "scores#new"
  resources :scores, only: [:index, :new, :create]
  post '/', to: "scores#create"
  get '/highscores', to: "scores#index"
end
