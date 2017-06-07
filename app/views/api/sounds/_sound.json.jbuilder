json.id sound.id
json.title sound.title
json.description sound.description
json.audioUrl asset_path(sound.audio.url)
json.collectionId sound.collection.id
json.userId sound.user.id

json.artworkUrl asset_path(sound.collection.artwork.url)
json.user do
  json.username sound.collection.user.username
end
