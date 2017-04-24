@collections.each do |collection|
  json.set! collection.id do
    json.partial! 'api/collections/collection', _collection: collection
  end
end
