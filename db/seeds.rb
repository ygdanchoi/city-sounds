# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ActiveRecord::Base.transaction do
  User.destroy_all
  User.create!(
    username: 'guest',
    password: 'password',
    location: 'Chelsea'
  )
  User.create!(
    username: 'dan',
    password: 'password',
    profile_pic_url: 'http://i.imgur.com/YcP0tik.jpg',
    location: 'North Jersey',
    bio: 'Med school reject, aspiring supervillain'
  )
end
