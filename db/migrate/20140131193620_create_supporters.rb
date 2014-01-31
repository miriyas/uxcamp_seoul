class CreateSupporters < ActiveRecord::Migration
  def change
    create_table :supporters do |t|
      t.string :name
      t.string :photo
      t.string :link
      t.integer :position
      t.integer :event_id

      t.timestamps
    end
  end
end
