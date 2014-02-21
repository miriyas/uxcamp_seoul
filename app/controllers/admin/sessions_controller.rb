class Admin::SessionsController < ApplicationController

	layout "admin"

  def new
    logger.info current_user
    logger.info "22222222222222222222222222222222"
    
    if current_user.present?
       logger.info "AaAAAAAAAAAAAAAAAAAAAAAA"
      if current_user.organizer?
        logger.info "BBBBBBBBBBBBB"
        redirect_to admin_root_path
      else
        logger.info "CCCCCCCCCCCCCCC"
        render :layout => false
      end
    else
      logger.info "DDDDDDDDDDDDDDDDD"
          render :layout => false
    end
    
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
