json.set! user.id do
  json.extract! user, :id, :username, :image_url, :bio, :location
end
