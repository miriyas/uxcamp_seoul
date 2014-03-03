class AddEndsAtToPeriod < ActiveRecord::Migration
  def change
		add_column :periods, :ends_at, :datetime
  end
end