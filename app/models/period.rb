# == Schema Information
#
# Table name: periods
#
#  id         :integer          not null, primary key
#  event_id   :integer
#  starts_at  :datetime
#  created_at :datetime
#  updated_at :datetime
#

class Period < ActiveRecord::Base
  belongs_to :event
  has_many :programs, :dependent => :destroy
  
	validates :event_id, presence: true
end
