class CreateOrganizers < ActiveRecord::Migration
  def change
    create_table :organizers do |t|
      t.string :name
      t.string :name_en
      t.string :photo
      t.string :link
      t.integer :position
      t.integer :event_id
      t.integer :organizer_group_id

      t.timestamps
    end
  end
end
