class RemoveUserPass < ActiveRecord::Migration
  def change
		remove_column :users, :crypted_password, :string
		remove_column :users, :salt, :string
  end
end