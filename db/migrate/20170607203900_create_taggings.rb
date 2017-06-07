class CreateTaggings < ActiveRecord::Migration[5.0]
  def change
    create_table :taggings do |t|
      t.integer :tag_id, null: false
      t.integer :collection_id, null: false
      t.timestamps
    end

    add_index :taggings, :tag_id
    add_index :taggings, :collection_id
    add_index :taggings, [:tag_id, :collection_id], unique: true
  end
end
