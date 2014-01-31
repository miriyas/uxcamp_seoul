class Admin::SupportersController < ApplicationController
	before_filter :require_organizer
	layout 'admin'
	
  def new
    @supporter = Supporter.new
  end
  def create
    params[:supporter][:event_id] = params[:event_id]
    @supporter = Supporter.new(supporter_params)
    if @supporter.save
      redirect_to admin_event_path(params[:event_id]), notice: '스폰서를 추가했습니다.'
    else
			p @supporter.errors
      render action: 'new'
    end
  end

  def edit
    @supporter = Supporter.find(params[:id])
  end
  def update
    @supporter = Supporter.find(params[:id])
    if @supporter.update(supporter_params)
      redirect_to admin_event_path(params[:event_id]), notice: '스폰서를 수정했습니다.'
    else
			p @supporter.errors
      render action: 'edit'
    end
  end
  
  def index
    redirect_to admin_event_path(params[:event_id])
  end

  def destroy
    @supporter = Supporter.find(params[:id])
    @supporter.destroy
		redirect_to admin_event_path(params[:event_id]), notice: '스폰서를 삭제했습니다.'
  end

  private
  def supporter_params
    params.require(:supporter).permit(:name, :event_id, :link, :photo, :position)
  end
end