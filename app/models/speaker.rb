# == Schema Information
#
# Table name: speakers
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  photo      :string(255)
#  info       :text
#  position   :integer
#  event_id   :integer
#  created_at :datetime
#  updated_at :datetime
#

class Speaker < ActiveRecord::Base
end
