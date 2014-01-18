# == Schema Information
#
# Table name: speakers
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  link       :string(255)
#  photo      :string(255)
#  event_id   :integer
#  program_id :integer
#  created_at :datetime
#  updated_at :datetime
#

require 'spec_helper'

describe Speaker do
  pending "add some examples to (or delete) #{__FILE__}"
end
