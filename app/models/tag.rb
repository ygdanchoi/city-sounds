class Tag < ApplicationRecord
  has_many :taggings, dependent: :destroy
  has_many :collections, through: :taggings

  validates :name, presence: true
  validates :name, uniqueness: true
end
