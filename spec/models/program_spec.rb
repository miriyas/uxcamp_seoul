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

require 'spec_helper'

describe Program do
  pending "add some examples to (or delete) #{__FILE__}"
end
