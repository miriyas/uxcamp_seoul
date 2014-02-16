class HistoriesController < ApplicationController
	layout 'history'
	
  def index
    @events = Event.all
  end

end