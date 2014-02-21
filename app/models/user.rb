# == Schema Information
#
# Table name: users
#
#  id                           :integer          not null, primary key
#  name                         :string(255)
#  email                        :string(255)      not null
#  role                         :string(255)      default("pending")
#  crypted_password             :string(255)      not null
#  salt                         :string(255)      not null
#  created_at                   :datetime
#  updated_at                   :datetime
#  remember_me_token            :string(255)
#  remember_me_token_expires_at :datetime
#

class User < ActiveRecord::Base
  authenticates_with_sorcery!
	has_many :authentications, :dependent => :destroy 

  # validates_presence_of :email
  # validates_uniqueness_of :email
  # validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
  # validates :password, length: { minimum: 4 }, :if => :password_required?
  # validates :password, confirmation: true, :if => :password_required?
  # validates :password_confirmation, presence: true, :if => :password_required?
  # validates_presence_of :name
  # validates_inclusion_of :role, :in => %w(admin organizer pending), :if => lambda { |m| m.role = "pending" if m.role.blank? }

  ROLES = {
    "최고관리자" => "admin",
    "오거나이저" => "organizer",
    "승인대기중" => "pending" 
  }

  # scope :organizers, -> { where(role: "organizer") }

  def password_required?
    new_record? || password
  end

  def organizer?
    (role == "admin") || (role == "organizer")
  end

  def admin?
    role == "admin"
  end

  def pending?
    role == "pending"
  end

end
