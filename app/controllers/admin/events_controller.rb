class Admin::EventsController < ApplicationController
	before_filter :require_organizer
	layout 'admin'
	
  def index
    @events = Event.all
  end

  def show
    @event = Event.find(params[:id])
  end

  def new
    @event = Event.new
  end
  def create
    @event = Event.new(event_params)
    if @event.save
      redirect_to admin_events_path, no함e: 'Event was successfully created.'
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
      redirect_to admin_events_path, notice: 'Event was successfully updated.'
    else
			p @event.errors
      render action: 'edit'
    end
  end

  def destroy
    @event = Event.find(params[:id])
    @event.destroy
		redirect_to events_url
  end

  private
    def event_params
      params.require(:event).permit(:title, :position, :starts_at, :ends_at, :poster)
    end
end