# == Schema Information
#
# Table name: supporters
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  photo      :string(255)
#  link       :string(255)
#  position   :integer
#  event_id   :integer
#  created_at :datetime
#  updated_at :datetime
#

require 'spec_helper'

describe Supporter do
  pending "add some examples to (or delete) #{__FILE__}"
end
