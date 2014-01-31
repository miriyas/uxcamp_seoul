class CreateOrganizerGroups < ActiveRecord::Migration
  def change
    create_table :organizer_groups do |t|
      t.string :name
      t.integer :position
      t.integer :event_id

      t.timestamps
    end
  end
end
