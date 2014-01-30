class Admin::UsersController < ApplicationController
	before_filter :require_admin, except: [:edit, :update]
	layout 'admin'
	
  def index
    @users = User.all.order("id asc")
  end
  
  def new
    @user = User.new
  end
  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to admin_users_path, notice: '사용자가 만들어졌습니다.'
    else
			p @user.errors
      render action: 'new'
    end
  end

  def edit
    unless current_user.id == params[:id].to_i
      redirect_to admin_events_path
    end
    @user = User.find(params[:id])
  end
  def update
    unless current_user.id == params[:id].to_i
      redirect_to admin_events_path
    end
    @user = User.find(params[:id])
    if @user.update(user_params)
      redirect_to admin_users_path, notice: '사용자가 수정되었습니다.'
    else
			p @user.errors
      render action: 'edit'
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
		redirect_to admin_users_path, notice: '사용자가 삭제되었습니다.'
  end

private
  def user_params
    params.require(:user).permit(:name, :email, :role, :email)
  end
end