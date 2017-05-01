# README

[CitySounds live][heroku]

[heroku]: http://city-sounds.herokuapp.com

CitySounds is a twist on the music sales platform Bandcamp, but focusing on ambient city sounds to be played while studying or relaxing. It's a full-stack web application utilizing Ruby on Rails/PostgreSQL on the backend and React.js/Redux on the frontend.

## Features & Implementation

### Discovering Sound Collections ("Albums")

Upon entering the site, the first thing to be fetched from the backend is a list of Sound Collection ("Album") tile objects. At the database level, a Sound Collection is stored in a SQL table containing columns for id, title, user_id (foreign key), and description (optional). Artwork image file storage is handled by the Paperclip gem integrated with Amazon Simple Storage Service (Amazon S3).

Similarly, the Sounds ("Tracks") table has columns for id, title, collection_id (foreign key), and description (optional); audio file storage is handled by Paperclip/S3.

Next to the list of Sound Collection tiles, an audio player component utilizing ReactAudioPlayer is rendered. This keeps track of whether a sound is playing, which particular sound is playing, and what the time position of the playing sound is. The main play/pause button, timeline/playhead, and individual Sound Collection play/pause buttons are able to set this state accordingly, as well as to change their appearance based on it.

### User Sidebar & Profile Page

To the left of the user profile page is a list of the user's uploaded Sound Collections. This consists of a simple AJAX request based on the userId in the URL.

To the right is a dynamic sidebar containing the user's avatar image, username, location, and bio. Excluding the username, these fields can be changed individually with instant feedback. In order to accomplish this, the sidebar keeps track of whether each field is being edited, what the new field value should be (in case of save), and what the value was previously (in case of cancel). The input field & save/cancel buttons are only shown after the edit field link has been clicked.

### Sound Collection Page

The Sound Collection page has an audio player nearly identical to the one on the home page, in terms of functionality. The main difference is that the current collection’s sounds replace the homepage's sound collection tiles.

The Sound Collection add/edit form has a tab for the collection, plus additional tabs for each Sound file. The form stores an array of all uploaded sounds and keeps track of the current index of this array to determine which tab is open. If this index is -1, then the collection tab is open. Upon submission, one massive formData is sent to the backend containing both collection and sound data. On the backend, all database manipulations are grouped into one transaction, with the collection save/update preceding the sound save/updates.

### Search

Sound Collections and Sounds are searched by title and description using the pg-search gem on the backend.
