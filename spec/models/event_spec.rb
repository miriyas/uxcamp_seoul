# == Schema Information
#
# Table name: events
#
#  id         :integer          not null, primary key
#  title      :string(255)
#  starts_at  :date
#  ends_at    :date
#  view_count :integer
#  position   :integer
#  created_at :datetime
#  updated_at :datetime
#

require 'spec_helper'

describe Event do
  pending "add some examples to (or delete) #{__FILE__}"
end
