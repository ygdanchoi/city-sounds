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
    result = params.require(:collection).permit(:title, :description, :artwork)
    if result[:artwork] == 'null'
      return result.merge(artwork: nil)
    else
      return result
    end
  end
end
