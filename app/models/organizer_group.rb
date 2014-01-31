# == Schema Information
#
# Table name: organizer_groups
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  position   :integer
#  event_id   :integer
#  created_at :datetime
#  updated_at :datetime
#

class OrganizerGroup < ActiveRecord::Base
  belongs_to :event
  has_many :organizers, :dependent => :nullify
	validates :event_id, presence: true
end
