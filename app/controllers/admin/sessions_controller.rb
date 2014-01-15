class Admin::SessionsController < ApplicationController

	layout "admin"

  def new
		render :layout => false
  end

  def create
    user = login(params[:email], params[:password], params[:remember_me])
    if user
			if user.organizer?
      	redirect_to admin_root_path
			else
	      flash.now.alert = "관리자 전용 메뉴입니다."
        render :new
			end
    else
      flash.now.alert = "메일주소나 비밀번호를 다시 확인해주세요."
      render :layout => false, :action => :new
    end
  end

  def destroy
		logout
    redirect_to admin_root_path, notice: "고생하셨습니다."
  end
end
