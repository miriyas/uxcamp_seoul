class HistoriesController < ApplicationController
	layout 'history'
	
  def index
    @events = Event.all
  end
  
  def show
    @event = Event.find(params[:id])
    @organizergroups = @event.organizer_groups.order("position")
    @organizers = @event.organizers.order("position")
  end

end