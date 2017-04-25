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
    ActiveRecord::Base.transaction do
      if @collection.save
        parse_and_save_sounds
        render 'api/collections/show'
      else
        render json: @collection.errors, status: 422
      end
    end
  end

  def update
    @collection = Collection.find(params[:id])
    ActiveRecord::Base.transaction do
      if @collection.update!(collection_params)
        parse_and_save_sounds
        render 'api/collections/show'
      else
        render json: @collection.errors, status: 422
      end
    end
  end

  def destroy
    @collection = Collection.find(params[:id])
    @collection.destroy
    render 'api/collections/show'
  end

  private
  def collection_params
    result = params.require(:collection).permit(:title, :description, :user_id)
    if params[:collection][:artwork] != 'null'
      return result.merge(artwork: params[:collection][:artwork])
    else
      return result
    end
  end

  def parse_and_save_sounds
    sounds = JSON.parse(params[:collection][:sounds])
    sounds.each_with_index do |sound, idx|
      if sound['id']
        s = Sound.find(sound['id'])
        s.update!(
          id: sound['id'],
          title: sound['title'],
          duration: sound['duration'].to_i,
        )
      else
        Sound.create!(
          title: sound['title'],
          duration: sound['duration'].to_i,
          audio: params[:collection]["audio#{idx}"],
          collection_id: @collection.id
        )
      end
    end
  end
end
