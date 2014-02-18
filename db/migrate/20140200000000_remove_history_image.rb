class RemoveHistoryImage < ActiveRecord::Migration
  def change
		remove_column :events, :history_image, :string
  end
end