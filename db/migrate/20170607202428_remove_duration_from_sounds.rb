class RemoveDurationFromSounds < ActiveRecord::Migration[5.0]
  def change
    remove_column :sounds, :duration, :integer
  end
end
