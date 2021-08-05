class ScoresController < ApplicationController
  def index
    @scores = Score.all.limit(20).order(points: :desc)
  end
  def create
    if Score.new(create_params).save
      render json: {success: true}
    else
      render json: {success: false}
    end
  end
  def new
    @top_score = Score.order(points: :desc).first.points
  end

  private

  def create_params
    params.permit(:name, :points)
  end
end
