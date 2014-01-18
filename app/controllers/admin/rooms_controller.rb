class Admin::RoomsController < ApplicationController
	before_filter :require_organizer
	layout 'admin'
	
  def new
    @room = Room.new
  end
  def create
    params[:room][:event_id] = params[:event_id]
    @room = Room.new(room_params)
    if @room.save
      redirect_to admin_event_path(params[:event_id]), notice: '방을 추가했습니다.'
    else
			p @room.errors
      render action: 'new'
    end
  end

  def edit
    @room = Room.find(params[:id])
  end
  def update
    @room = Room.find(params[:id])
    if @room.update(room_params)
      redirect_to admin_event_path(params[:event_id]), notice: '방을 수정했습니다.'
    else
			p @room.errors
      render action: 'edit'
    end
  end

  def destroy
    @room = Room.find(params[:id])
    @room.destroy
		redirect_to admin_event_path(params[:event_id]), notice: '방을 삭제했습니다.'
  end

  private
  def room_params
    params.require(:room).permit(:name, :event_id)
  end
end