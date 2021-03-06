class Api::UsersController < ApplicationController
  def index
    @users = User.all
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render 'api/users/show'
    else
      render json: @user.errors, status: 422
    end
  end

  def show
    @user = User.find(params[:id])
    if @user
      render :show
    else
      render json: { base: ['User does not exist'] }, status: 404
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render 'api/users/show'
    else
      render json: @user.errors, status: 422
    end
  end

  def user_params
    result = params.require(:user).permit(:username, :password, :avatar, :location, :bio)
    if result[:avatar] == 'null'
      return result.merge(avatar: nil)
    else
      return result
    end
  end
end
