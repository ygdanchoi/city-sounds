# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ActiveRecord::Base.transaction do
  User.destroy_all
  Collection.destroy_all
  Sound.destroy_all

  guest = User.create!(
    username: 'guest',
    password: 'password',
    location: 'Chelsea'
  )
  
  dan = User.create!(
    username: 'dan',
    password: 'password',
    location: 'North Jersey',
    bio: 'Med school reject, aspiring supervillain',
    avatar: File.open('app/assets/images/avatars/dan.jpg')
  )

  taurindb = User.create!(
    username: 'taurindb',
    password: 'taurindb',
    bio: <<-TEXT
Hi!

I exclusively post field recordings on Freesound.org.

I use an Edirol R-09HR to record all of my field recordings. 

Visit me @ www.taurinbarrera.com
TEXT
  )

  beijing = Collection.create!(
    title: 'Beijing',
    description: <<-TEXT,
Sound 1: A walkthrough of China's most visited tourist destination. There were SO many people in this immense square, many with their own megaphones, rhymes, and reasons. I walk around the square, through the underpass, and towards the Forbidden City.

Sound 2: Recorded on the newly built D trains that can travel from Shanghai to Beijing at speeds up to 350 kmh. This recording was made on the second day the trains opened, July 2, 2011, there are not many people on the train. You can hear some pretty cool oscillating wind resistance.

Recorded with an Edirol R-09 HR in Beijing, China, July, 2011.
TEXT
    user_id: taurindb.id
  )

  tianmen_square = Sound.create!(
    title: 'Tianmen Square',
    duration: 424,
    collection_id: beijing.id
  )

  bullet_train_from_shanghai_to_beijing = Sound.create!(
    title: 'Bullet train from Shanghai to Beijing',
    duration: 482,
    collection_id: beijing.id
  )
end
