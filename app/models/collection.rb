class Collection < ApplicationRecord
  validates :title, :user, presence: true

  has_many :sounds
  belongs_to :user
end
