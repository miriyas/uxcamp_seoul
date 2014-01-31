# == Schema Information
#
# Table name: organizer_groups
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  position   :integer
#  event_id   :integer
#  created_at :datetime
#  updated_at :datetime
#

require 'spec_helper'

describe OrganizerGroup do
  pending "add some examples to (or delete) #{__FILE__}"
end
