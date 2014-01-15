class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :title
      t.date :starts_at
      t.date :ends_at
      t.integer :view_count
      t.integer :position

      t.timestamps
    end
  end
end
