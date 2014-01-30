# == Schema Information
#
# Table name: speakers
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  link       :string(255)
#  event_id   :integer
#  program_id :integer
#  created_at :datetime
#  updated_at :datetime
#

class Speaker < ActiveRecord::Base
  belongs_to :event
  belongs_to :program
end
