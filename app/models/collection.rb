class Collection < ApplicationRecord
  validates :title, :user, presence: true

  has_many :sounds
  belongs_to :user

  has_attached_file :artwork
  validates_attachment_content_type :artwork, content_type: /\Aimage\/.*\z/
end
