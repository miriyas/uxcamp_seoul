class CreateSpeakers < ActiveRecord::Migration
  def change
    create_table :speakers do |t|
      t.string :name
      t.string :photo
      t.text :info
      t.integer :position
      t.integer :event_id

      t.timestamps
    end
  end
end
