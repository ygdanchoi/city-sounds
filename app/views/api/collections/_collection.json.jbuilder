json.id _collection.id
json.user do
  json.id _collection.user.id
  json.username _collection.user.username
  json.location _collection.user.location
  json.avatarUrl asset_path(_collection.user.avatar.url)
end
json.title _collection.title
json.artworkUrl asset_path(_collection.artwork.url)
json.description _collection.description
json.soundIds _collection.sounds.map { |sound| sound.id }
json.duration _collection.sounds.inject(0) { |acc, sound| acc += sound.duration }
