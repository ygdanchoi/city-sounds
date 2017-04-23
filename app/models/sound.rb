class Sound < ApplicationRecord
  validates :title, :duration, :collection, presence: true

  belongs_to :collection
  has_one :user, through: :collection
end
