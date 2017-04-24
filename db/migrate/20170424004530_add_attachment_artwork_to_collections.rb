class AddAttachmentArtworkToCollections < ActiveRecord::Migration
  def self.up
    change_table :collections do |t|
      t.attachment :artwork
    end
  end

  def self.down
    remove_attachment :collections, :artwork
  end
end
