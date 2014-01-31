class EventsController < ApplicationController
	layout 'camp5th'
	
  def show
    @event = Event.find(params[:id])
    @periods = @event.periods.order("starts_at")
    @organizers = @event.organizers.order("position")
    @supporters = @event.supporters.order("position")
  end

end