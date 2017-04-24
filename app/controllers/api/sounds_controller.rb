class Api::SoundsController < ApplicationController
  def index
    if params[:collection_id]
      @sounds = Sound.where(collection_id: params[:collection_id])
    else
      @sounds = Sound.all
    end
  end

  def show
    @sound = Sound.find(params[:id])
    if @sound
      render :show
    else
      render json: { base: ['Sound does not exist'] }, status: 404
    end
  end

  def create
  end

  def update
  end

  def destroy
  end

  private
  def sound_params
  end
end
