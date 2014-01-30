class Admin::SpeakersController < ApplicationController
	before_filter :require_organizer
	layout 'admin'
	
  def new
    @speaker = Speaker.new
  end
  def create
    params[:speaker][:event_id] = params[:event_id]
    params[:speaker][:program_id] = params[:program_id]
    @speaker = Speaker.new(speaker_params)
    if @speaker.save
      redirect_to admin_event_path(params[:event_id]), notice: '연사를 추가했습니다.'
    else
			p @speaker.errors
      render action: 'new'
    end
  end

  def edit
    @speaker = Speaker.find(params[:id])
  end
  def update
    @speaker = Speaker.find(params[:id])
    if @speaker.update(speaker_params)
      redirect_to admin_event_path(params[:event_id]), notice: '연사를 수정했습니다.'
    else
			p @speaker.errors
      render action: 'edit'
    end
  end

  def destroy
    @speaker = Speaker.find(params[:id])
    @speaker.destroy
		redirect_to admin_event_path(params[:event_id]), notice: '연사를 삭제했습니다.'
  end

private
  def speaker_params
    params.require(:speaker).permit(:name, :link, :event_id, :program_id)
  end
end