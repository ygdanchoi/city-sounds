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
1. A walkthrough of China's most visited tourist destination. There were SO many people in this immense square, many with their own megaphones, rhymes, and reasons. I walk around the square, through the underpass, and towards the Forbidden City.

2. Recorded on the newly built D trains that can travel from Shanghai to Beijing at speeds up to 350 kmh. This recording was made on the second day the trains opened, July 2, 2011, there are not many people on the train. You can hear some pretty cool oscillating wind resistance.

Recorded with an Edirol R-09 HR in Beijing, China, July, 2011.

Original sources:
https://www.freesound.org/s/135998/
https://www.freesound.org/s/135995/
Licensed under CC BY 3.0
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

  emanuele_correani = User.create!(
    username: 'Emanuele_Correani',
    password: 'Emanuele_Correani',
    bio: <<-TEXT
Sound Recordist, sound editor and foley artist based in London.
TEXT
  )

  location_recordings = Collection.create!(
    title: 'Location Recordings',
    description: <<-TEXT,
1. Inside Liverpool Street Station, London, 3:30pm

2. Recorded in London, South Tottenham, Seven Sisters at noon.

3. A journey in the Bakeloo Line: Waterloo Station to Oxford Circus

Equipment used:

- Two spaced Oktava 012 with omnidirectional capsules.
- PSC M4 MKII Mixer
- Tascam DR40 Recorder

Original sources:
https://www.freesound.org/s/332769/
https://www.freesound.org/s/332593/
https://www.freesound.org/s/332768/
Licensed under CC BY 3.0
TEXT
    user_id: emanuele_correani.id
  )

  ambience_train_station_inside = Sound.create!(
    title: 'Ambience - Train Station - Inside',
    duration: 473,
    collection_id: location_recordings.id
  )

  ambience_day_city_backyard_noon = Sound.create!(
    title: 'Ambience - Day - City - Backyard - Noon',
    duration: 848,
    collection_id: location_recordings.id
  )

  underground_inside_the_train_london_tube = Sound.create!(
    title: 'Underground - Inside the train - London Tube',
    duration: 492,
    collection_id: location_recordings.id
  )

  corsica_s = User.create!(
    username: 'Corsica_S',
    password: 'Corsica_S',
    bio: <<-TEXT
If possible, I would love to hear how you use these samples!
You can make fun of me on facebook: www.facebook.com/corsica.ess

I encourage you to donate to Freesound.org if you can!
If you use any female voice sounds please credit "Amy Gedgaudas".
If you use Corsica_S sounds please credit either "corsica_s" or "Tim Kahn"
No longer doing voice requests. Sorry!
Thanks for your understanding!
TEXT
  )

  walking_time_square = Collection.create!(
    title: 'walking times square',
    description: <<-TEXT,
Walking around Time Square in New York City at around midnight Friday March 2nd (Technically Saturday the 3rd, but you know what I mean). It was a bit windy that night so unfortunately there is some wind noise.Recorded with Zoom H4 on-board mics and included wind muff.Part 1 of 2 (walking on 7th back towards where I started)

Original sources:
https://www.freesound.org/s/31982/
https://www.freesound.org/s/31983/
Licensed under CC BY 3.0
TEXT
    user_id: corsica_s.id
  )

  walking_time_square_part_1 = Sound.create!(
    title: 'walking time square part 1',
    duration: 545,
    collection_id: walking_time_square.id
  )

  walking_time_square_part_2 = Sound.create!(
    title: 'walking time square part 2',
    duration: 407,
    collection_id: walking_time_square.id
  )

end
