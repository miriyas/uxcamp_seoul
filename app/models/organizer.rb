# == Schema Information
#
# Table name: organizers
#
#  id                 :integer          not null, primary key
#  name               :string(255)
#  name_en            :string(255)
#  photo              :string(255)
#  link               :string(255)
#  position           :integer
#  event_id           :integer
#  organizer_group_id :integer
#  created_at         :datetime
#  updated_at         :datetime
#

class Organizer < ActiveRecord::Base
  mount_uploader :photo, ProfileUploader

  belongs_to :organizer_group
  belongs_to :event
	
  validates :event_id, presence: true
  
  scope :free_organizers, -> { where(organizer_group_id: nil) }
  
end
