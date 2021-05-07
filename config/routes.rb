Rails.application.routes.draw do
  root "scores#new"
  resources :scores, only: [:index, :new, :create]
end
