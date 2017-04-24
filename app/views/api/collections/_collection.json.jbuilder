json.id _collection.id
json.userId _collection.user.id
json.title _collection.title
json.artworkUrl asset_path(_collection.artwork.url)
json.description _collection.description
json.soundIds _collection.sounds.map { |sound| sound.id }
json.duration _collection.sounds.inject(0) { |acc, sound| acc += sound.duration }
