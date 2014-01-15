class CreatePrograms < ActiveRecord::Migration
  def change
    create_table :programs do |t|
      t.string :title
      t.datetime :starts_at
      t.datetime :ends_at
      t.integer :position
      t.integer :event_id

      t.timestamps
    end
  end
end
