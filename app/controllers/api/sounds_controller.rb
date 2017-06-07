class Api::SoundsController < ApplicationController
  def index
    if params[:collection_id]
      @sounds = Sound.where(collection_id: params[:collection_id])
    else
      @sounds = Sound.all
    end
  end

  def search
    @sounds = Sound.search(params[:query])
    render 'api/sounds/index'
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
    @sound = Sound.new(sound_params)
    if @sound.save
      render 'api/sounds/show'
    else
      render json: @sound.errors, status: 422
    end
  end

  def update
    @sound = Sound.find(params[:id])
    if @sound.update(sound_params)
      render 'api/sounds/show'
    else
      render json: @sound.errors, status: 422
    end
  end

  def destroy
    @sound = Sound.find(params[:id])
    @sound.destroy
    render json: {}
  end

  private
  def sound_params
    params.require(:sound).permit(:title, :description, :audio)
  end
end
