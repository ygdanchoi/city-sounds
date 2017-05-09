# README

[CitySounds live][heroku]

[heroku]: http://www.citysoundsapp.com/#/

CitySounds is a full-stack web application for sharing and playing ambient city soundscapes. Based on Bandcamp, it utilizes Ruby on Rails with PostgreSQL on the backend and React.js with Redux on the frontend.

## Database

CitySounds allows visitors to browse through other users' collections and listen to sounds. Users who are logged in can also create, edit, and delete sound collections. In order to achieve this, I used three primary `ActiveRecord` models:
1. `User`
2. `SoundCollection` (analogous to an Album)
3. `Sound` (analogous to a Track)

### User

At the PostgreSQL database level, a `User` is stored in a table with the following columns:
- `id`
- `username`
- `bio` (optional)
- `location` (optional)
- Authentication information

In addition, `avatar` images are handled by the `paperclip` gem and stored on Amazon Simple Storage Service (S3).

### Sound Collection

The SQL table for `SoundCollection` has the following columns:
- `id`
- `title`
- `user_id` (foreign key)
- `description` (optional)

In addition, `avatar` images are stored on Amazon S3 via `paperclip`.

### Sound

The SQL table for `Sound` has the following columns:
- `id`
- `title`
- `collection_id` (foreign key)
- `description` (optional)

In addition, `audio` files are stored on Amazon S3 via `paperclip`.

## Features

### Exploring Collections

Upon entering the homepage, an AJAX request is made to fetch all `SoundCollection` objects, which are then rendered as `ExploreListItem` React components in the `Explore` section. Next to this is the `ExploreSoundPlayer` component, which utilizes `ReactAudioPlayer` to allow my custom-styled HTML elements to control audio playback. By default, the first `Sound` of the first `SoundCollection` is loaded into the `ExploreSoundPlayer` state.

![explore](https://raw.githubusercontent.com/ygdanchoi/city-sounds/master/docs/clippings/explore.jpg)

To enable the user to switch seamlessly between `SoundCollections`, I put the audio playback state into the `Explore` component and connected it not only to the `ExploreSoundPlayer` (code snippet below), but also to the `ExploreList`, so that each `ExploreListItem` could conditionally style its play/pause button.

```js
<ExploreSoundPlayer
    sound={ this.state.playingSound }
    playing={ this.state.playing }
    playPauseAudio={ this.playPauseAudio }
    playedYet={ this.state.playedYet }
    setPlayedYet={ this.setPlayedYet } />
```

![explore_sound_player](https://raw.githubusercontent.com/ygdanchoi/city-sounds/master/docs/clippings/explore_sound_player.jpg)

### The User Profile Page

Each `ExploreListItem` in the homepage contains links to the collection author's profile page. Both visitors who aren't logged in and users browsing someone else's profile will see a simple static profile page.

![user_profile_static](https://raw.githubusercontent.com/ygdanchoi/city-sounds/master/docs/clippings/user_profile_static.jpg)

Users who are logged in see a personalized navigation bar and--if on their own profile page--links to edit their `avatar` image, `location`, and `bio`.

![user_profile_dynamic](https://raw.githubusercontent.com/ygdanchoi/city-sounds/master/docs/clippings/user_profile_dynamic.jpg)

To the left of the user profile page is a list of the user's uploaded Sound Collections. This consists of a simple AJAX request based on the userId in the URL.

To the right is a dynamic sidebar containing the user's avatar image, username, location, and bio. Excluding the username, these fields can be changed individually with instant feedback. In order to accomplish this, the sidebar keeps track of whether each field is being edited, what the new field value should be (in case of save), and what the value was previously (in case of cancel). The input field & save/cancel buttons are only shown after the edit field link has been clicked.

### Sound Collection Page

The Sound Collection page has an audio player nearly identical to the one on the home page, in terms of functionality. The main difference is that the current collection’s sounds replace the homepage's sound collection tiles.

The Sound Collection add/edit form has a tab for the collection, plus additional tabs for each Sound file. The form stores an array of all uploaded sounds and keeps track of the current index of this array to determine which tab is open. If this index is -1, then the collection tab is open. Upon submission, one massive formData is sent to the backend containing both collection and sound data. On the backend, all database manipulations are grouped into one transaction, with the collection save/update preceding the sound save/updates.

### Search

Sound Collections and Sounds are searched by title and description using the pg-search gem on the backend.
