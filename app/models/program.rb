# == Schema Information
#
# Table name: programs
#
#  id         :integer          not null, primary key
#  title      :string(255)
#  starts_at  :datetime
#  ends_at    :datetime
#  position   :integer
#  event_id   :integer
#  created_at :datetime
#  updated_at :datetime
#

class Program < ActiveRecord::Base
end
