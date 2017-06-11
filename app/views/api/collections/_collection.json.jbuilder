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
_collection.sounds.each do |sound|
  json.sounds do
    json.set! sound.id do
      json.id sound.id
      json.title sound.title
      json.description sound.description
      json.audioUrl asset_path(sound.audio.url)
    end
  end
end