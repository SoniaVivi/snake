Rails.application.routes.draw do
  root "scores#new"
  resources :scores, only: [:index, :new, :create]
  post 'highscores', to: "scores#create"
end
