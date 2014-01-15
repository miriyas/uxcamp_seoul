# == Schema Information
#
# Table name: organizers
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  photo      :string(255)
#  link       :string(255)
#  role       :string(255)
#  position   :integer
#  event_id   :integer
#  created_at :datetime
#  updated_at :datetime
#

class Organizer < ActiveRecord::Base
end
