class EventsController < ApplicationController
	layout 'camp5th'
	
  def index
    @events = Event.all.order("position")
  end

  def show
    @event = Event.find(params[:id])
    @periods = @event.periods.order("starts_at")
    @organizers = @event.organizers.order("position")
  end

end