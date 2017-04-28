class Collection < ApplicationRecord
  include PgSearch
  pg_search_scope :search, :against => [:title, :description]

  validates :title, :user, presence: true

  has_many :sounds, dependent: :destroy, inverse_of: :collection
  belongs_to :user

  has_attached_file :artwork, default_url: 'artwork-missing.png'
  validates_attachment_content_type :artwork, content_type: /\Aimage\/.*\z/
end
