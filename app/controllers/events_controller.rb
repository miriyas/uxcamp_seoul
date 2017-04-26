class EventsController < ApplicationController
  layout 'camp5th'

  def show
    @event = Event.find(params[:id])
    @periods = @event.periods.order("starts_at")
    @organizergroups = @event.organizer_groups.order("position")
    @organizers = @event.organizers.order("position")
    @supporters = @event.supporters.order("position")
    @event.increment!(:view_count)
  end

end
