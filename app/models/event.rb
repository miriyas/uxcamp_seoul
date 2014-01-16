# == Schema Information
#
# Table name: events
#
#  id         :integer          not null, primary key
#  title      :string(255)
#  starts_at  :date
#  ends_at    :date
#  view_count :integer
#  position   :integer
#  created_at :datetime
#  updated_at :datetime
#

class Event < ActiveRecord::Base
  mount_uploader :poster, PosterUploader

end
