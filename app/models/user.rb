# == Schema Information
#
# Table name: users
#
#  id                           :integer          not null, primary key
#  name                         :string(255)
#  email                        :string(255)      not null
#  role                         :string(255)      default("organizer")
#  status                       :string(255)      default("pending")
#  crypted_password             :string(255)      not null
#  salt                         :string(255)      not null
#  created_at                   :datetime
#  updated_at                   :datetime
#  remember_me_token            :string(255)
#  remember_me_token_expires_at :datetime
#

class User < ActiveRecord::Base
  authenticates_with_sorcery!
end
