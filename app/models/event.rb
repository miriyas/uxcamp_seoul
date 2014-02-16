# == Schema Information
#
# Table name: events
#
#  id         :integer          not null, primary key
#  title      :string(255)
#  poster     :string(255)
#  starts_at  :date
#  ends_at    :date
#  view_count :integer          default(0)
#  position   :integer
#  created_at :datetime
#  updated_at :datetime
#

class Event < ActiveRecord::Base
  mount_uploader :poster, PosterUploader
  mount_uploader :history_image, HistoryImageUploader

  has_many :rooms, :dependent => :destroy
  has_many :periods, :dependent => :destroy
  has_many :organizer_groups, :dependent => :destroy
  has_many :organizers, :dependent => :destroy
  has_many :supporters, :dependent => :destroy
    
	validates :title, presence: true
  
end
