class Sound < ApplicationRecord
  include PgSearch
  pg_search_scope :search, :against => [:title, :description]

  validates :title, presence: true

  belongs_to :collection
  has_one :user, through: :collection, inverse_of: :sounds

  has_attached_file :audio
    validates_attachment_content_type :audio,
    :content_type => [
      'audio/mpeg',
      'audio/x-mpeg',
      'audio/mp3',
      'audio/x-mp3',
      'audio/mpeg3',
      'audio/x-mpeg3',
      'audio/mpg',
      'audio/x-mpg',
      'audio/x-mpegaudio',
      'audio/mp4',
      'audio/x-mp4',
      'audio/x-mp4audio'
    ]
end
