class Admin::EventsController < ApplicationController
	before_filter :require_organizer
	layout 'admin'
	
  def index
    @events = Event.all.order("position")
  end

  def show
    @event = Event.find(params[:id])
    @periods = @event.periods.order("starts_at")
    @organizergroups = @event.organizer_groups.order("position")
    @organizers = @event.organizers.order("position")
    @supporters = @event.supporters.order("position")
  end

  def new
    @event = Event.new
  end
  def create
    @event = Event.new(event_params)
    if @event.save
      redirect_to admin_events_path, notice: '행사가 만들어졌습니다.'
    else
			p @event.errors
      render action: 'new'
    end
  end

  def edit
    @event = Event.find(params[:id])
  end
  def update
    @event = Event.find(params[:id])
    if @event.update(event_params)
      redirect_to admin_event_path(@event), notice: '행사가 수정되었습니다.'
    else
			p @event.errors
      render action: 'edit'
    end
  end

  def destroy
    @event = Event.find(params[:id])
    @event.destroy
		redirect_to admin_events_path, notice: '행사가 삭제되었습니다.'
  end

  private
    def event_params
      params.require(:event).permit(:title, :summary, :position, :starts_at, :ends_at, :poster)
    end
end