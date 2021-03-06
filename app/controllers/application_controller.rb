class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  has_mobile_fu false
  
  # admin
  def require_admin
    unless admin_logged_in?
      redirect_to admin_events_path
    end
  end
  def admin_logged_in?
    current_user && current_user.admin?
  end

  def require_organizer
    unless organizer_logged_in?
      redirect_to admin_login_path
    end
  end
  def organizer_logged_in?
    current_user && current_user.organizer?
  end

end
