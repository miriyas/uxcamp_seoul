class CreateOrganizers < ActiveRecord::Migration
  def change
    create_table :organizers do |t|
      t.string :name
      t.string :photo
      t.string :link
      t.string :role
      t.integer :position
      t.integer :event_id

      t.timestamps
    end
  end
end
