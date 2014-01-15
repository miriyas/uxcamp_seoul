class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  # admin
  def require_organizer
    unless organizer_logged_in?
      redirect_to admin_login_path
    end
  end
	
  def organizer_logged_in?
    current_user && current_user.organizer?
  end

end
