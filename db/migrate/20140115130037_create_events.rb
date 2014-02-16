class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :title
      t.text :summary
      t.string :poster
      t.string :history_image
      t.date :starts_at
      t.date :ends_at
      t.integer :view_count, :default => 0
      t.integer :position

      t.timestamps
    end
  end
end
