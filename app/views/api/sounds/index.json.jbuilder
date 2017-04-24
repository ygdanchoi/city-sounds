@sounds.each do |sound|
  json.set! sound.id do
    json.partial! 'api/sounds/sound', sound: sound
  end
end
