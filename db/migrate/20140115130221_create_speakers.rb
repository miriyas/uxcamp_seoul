class CreateSpeakers < ActiveRecord::Migration
  def change
    create_table :speakers do |t|
      t.string :name
      t.string :link
      t.integer :event_id
      t.integer :program_id

      t.timestamps
    end
  end
end
