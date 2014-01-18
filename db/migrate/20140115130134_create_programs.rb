class CreatePrograms < ActiveRecord::Migration
  def change
    create_table :programs do |t|
      t.string :title
      t.string :room_id
      t.text :content
      t.integer :position
      t.integer :period_id

      t.timestamps
    end
  end
end

