class Admin::OrganizersController < ApplicationController
	before_filter :require_organizer
	layout 'admin'
	
  def new
    @organizer = Organizer.new
  end
  def create
    params[:organizer][:event_id] = params[:event_id]
    params[:organizer][:organizer_group_id] = params[:organizer_group_id] || nil
    @organizer = Organizer.new(organizer_params)
    if @organizer.save
      redirect_to admin_event_path(params[:event_id]), notice: '오거나이저를 추가했습니다.'
    else
			p @organizer.errors
      render action: 'new'
    end
  end

  def edit
    @organizer = Organizer.find(params[:id])
  end
  def update
    @organizer = Organizer.find(params[:id])
    if @organizer.update(organizer_params)
      redirect_to admin_event_path(params[:event_id]), notice: '오거나이저를 수정했습니다.'
    else
			p @organizer.errors
      render action: 'edit'
    end
  end
  
  def index
    redirect_to admin_event_path(params[:event_id])
  end

  def destroy
    @organizer = Organizer.find(params[:id])
    @organizer.destroy
		redirect_to admin_event_path(params[:event_id]), notice: '오거나이저를 삭제했습니다.'
  end

  private
  def organizer_params
    params.require(:organizer).permit(:name, :event_id, :link, :organizer_group_id, :photo, :position)
  end
end