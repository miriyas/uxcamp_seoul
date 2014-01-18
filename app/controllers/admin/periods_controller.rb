class Admin::PeriodsController < ApplicationController
	before_filter :require_organizer
	layout 'admin'
	
  def new
    @period = Period.new
  end
  def create
    refine_params
    @period = Period.new(period_params)
    if @period.save
      redirect_to admin_event_path(params[:event_id]), notice: '시간대를 추가했습니다.'
    else
			p @period.errors
      render action: 'new'
    end
  end

  def edit
    @period = Period.find(params[:id])
  end
  def update
    refine_params
    @period = Period.find(params[:id])
    if @period.update(period_params)
      redirect_to admin_event_path(params[:event_id]), notice: '시간대를 수정했습니다.'
    else
			p @period.errors
      render action: 'edit'
    end
  end

  def destroy
    @period = Period.find(params[:id])
    @period.destroy
		redirect_to admin_event_path(params[:event_id]), notice: '시간대를 삭제했습니다.'
  end

  private
  def refine_params
    params[:period][:"starts_at(1i)"] = Event.find(params[:event_id]).starts_at.strftime("%Y")
    params[:period][:"starts_at(2i)"] = Event.find(params[:event_id]).starts_at.strftime("%m")
    params[:period][:"starts_at(3i)"] = Event.find(params[:event_id]).starts_at.strftime("%d")
    params[:period][:event_id] = params[:event_id]
  end
  
  def period_params
    params.require(:period).permit(:starts_at, :event_id)
  end
end