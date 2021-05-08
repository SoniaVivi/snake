class ScoresController < ApplicationController
  def index
  end
  def create
    if Score.new(create_params).save
      render json: {success: true}
    else
      render json: {success: false}
    end
  end
  def new
  end

  private

  def create_params
    params.permit(:name, :points)
  end
end
