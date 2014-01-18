class CreatePeriods < ActiveRecord::Migration
  def change
    create_table :periods do |t|
      t.integer :event_id
      t.datetime :starts_at

      t.timestamps
    end
  end
end
