class AddDescriptionToSounds < ActiveRecord::Migration[5.0]
  def change
    add_column :sounds, :description, :text
  end
end
