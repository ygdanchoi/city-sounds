class AddAttachmentAudioToSounds < ActiveRecord::Migration
  def self.up
    change_table :sounds do |t|
      t.attachment :audio, null: false
    end
  end

  def self.down
    remove_attachment :sounds, :audio
  end
end
