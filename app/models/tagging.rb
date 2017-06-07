class Tagging < ApplicationRecord
  belongs_to :tag
  belongs_to :collection
  validates :tag, :collection, presence: true
  validates :tag_id, uniqueness: {scope: :collection_id }
end
