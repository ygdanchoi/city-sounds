class Api::CollectionsController < ApplicationController
  def index
    if params[:user_id]
      @collections = Collection.where(user_id: params[:user_id])
    else
      @collections = Collection.all
    end
  end

  def show
    @collection = Collection.find(params[:id])
    if @collection
      render :show
    else
      render json: { base: ['Collection does not exist'] }, status: 404
    end
  end

  def create
    @collection = Collection.new(collection_params)
    if @collection.save
      @sounds.each do |sound|
        sound.collection_id = @collection.id
        sound.save!
      end
      render 'api/collections/show'
    else
      render json: @collection.errors, status: 422
    end
  end

  def update
    @collection = Collection.find(params[:id])
    if @collection.update(collection_params)
      render 'api/collections/show'
    else
      render json: @collection.errors, status: 422
    end
  end

  def destroy
    @collection = Collection.find(params[:id])
    @collection.destroy
    render 'api/collections/show'
  end

  private
  def collection_params
    sounds_meta = JSON.parse(params[:collection][:sounds])
    @sounds = []
    sounds_meta.each_with_index do |sound, idx|
      @sounds << Sound.new(
        title: sound['title'],
        duration: sound['duration'].to_i,
        audio: params[:collection]["audio#{idx}"]
      )
    end
    result = params.require(:collection).permit(:title, :description, :artwork, :user_id)
    if result[:artwork] == 'null'
      return result.merge(artwork: nil)
    else
      return result
    end
  end
end
