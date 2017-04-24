json.id user.id
json.username user.username
json.avatarUrl asset_path(user.avatar.url)
json.bio user.bio
json.location user.location
json.collectionIds user.collections.map { |collection| collection.id }
