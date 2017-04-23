class CreateSounds < ActiveRecord::Migration[5.0]
  def change
    create_table :sounds do |t|
      t.string :title, null: false
      t.integer :duration, null: false, default: 0
      t.integer :collection_id, null: false, index: true
      t.timestamps
    end
  end
end
