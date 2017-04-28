# README

[CitySounds live][heroku]

[heroku]: http://city-sounds.herokuapp.com

CItySounds is a twist on the music sales platform Bandcamp, but focusing on ambient city sounds to be played while studying or relaxing. It's a full-stack web application utilizing Ruby on Rails/PostgreSQL on the backend and React.js/Redux on the frontend.

Discovering Sound Collections ("Albums")

Upon entering the site, the first thing to be fetched from the backend is a list of Sound Collection ("Albums") tiles. At the database level, a Sound Collection exists as SQL table columns for id, title, user_id (foreign key), and description (optional). Artwork image file storage is handled by the Paperclip gem integrated with Amazon Simple Storage Service (Amazon S3).

Similarly, Sounds ("Tracks") have columns for id, title, collection_id (foreign key), and description (optional); audio file storage is handled by Paperclip/S3.

In addition, a ReactAudioPlayer applet is rendered beside the list of Sound Collections. From this list, a single Sound Collection is used to request a list of associated Sounds, and the first of these is passed into the audio player. The audio player keeps track of the audio file's playing/paused and position states. Each Sound Collection tile has the ability to play/pause audio, as well as awareness of which sound is currently playing/paused.

User Sidebar & Profile Page

The user profile page has a list of the user's Sound Collections.

The user sidebar utilizes in-line forms for artwork, location, and bio.

Sound Collection Page

The Sound Collection page has an audio player nearly identical to that on the home page.

The Sound Collection add/edit form has additional tabs for each Sound file, and uploads one massive formData all at once.

Search

Sound Collections and Sounds can be searched by title and description.
