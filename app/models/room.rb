# == Schema Information
#
# Table name: rooms
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  event_id   :integer
#  created_at :datetime
#  updated_at :datetime
#

class Room < ActiveRecord::Base
  belongs_to :event
  has_many :programs, :dependent => :nullify
end
