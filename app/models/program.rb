# == Schema Information
#
# Table name: programs
#
#  id         :integer          not null, primary key
#  title      :string(255)
#  room_id    :string(255)
#  content    :text
#  position   :integer
#  period_id  :integer
#  created_at :datetime
#  updated_at :datetime
#

class Program < ActiveRecord::Base
  belongs_to :period
  belongs_to :room  
  has_many :speakers, :dependent => :destroy
end
