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

Each `ExploreListItem` in the homepage contains links to the collection author's profile page. Both visitors who aren't logged in and users browsing someone else's profile see a simple static profile page.

![user_profile_static](https://raw.githubusercontent.com/ygdanchoi/city-sounds/master/docs/clippings/user_profile_static.jpg)

Users who are logged in see a personalized `NavBarContainer` and—if on their own profile page—sidebar links to edit their `avatar` image, `location`, and `bio`.

![user_profile_dynamic](https://raw.githubusercontent.com/ygdanchoi/city-sounds/master/docs/clippings/user_profile_dynamic.jpg)

The `UserSidebarContainer` on the right is further divided into three dynamic sub-components:
1. `UserSidebarAvatar`
2. `UserSidebarLocation`
3. `UserSidebarBio`

The `UserSidebarContainer` state keeps track of which, if any, of the `avatar`/`location`/`bio` fields are being edited (code snippet below) and passes that information to the corresponding sub-component.
```js
this.state = {
  avatarFile: null,
  avatarUrl: this.props.user.avatarUrl,
  location: this.props.user.location,
  bio: this.props.user.bio,
  editingLocation: false,
  editingBio: false
};
```

When a link is clicked within a sub-component, the static `<image>` or `<p>` element is replaced with appropriate `<input>` elements and, if applicable, `<button>` elements to save/cancel.

![user_sidebar](https://raw.githubusercontent.com/ygdanchoi/city-sounds/master/docs/clippings/user_sidebar.jpg)

Uploading an `avatar` image or saving a new `location`/`bio` immediately dispatches a `thunk` action that sends an AJAX `PATCH` request to the backend, receives the new `user` and `currentUser`, and updates the Redux state—thus forcing the `UserSidebarContainer` and `NavBarContainer` to re-render with the new user information.

### The Collection Page

The collection page renders a `CollectionSoundPlayer` functionally identical to the `ExploreSoundPlayer` on the home page, except that `SoundListItems` replace the homepage's `ExploreListItems`.

The Sound Collection add/edit form has a tab for the collection, plus additional tabs for each Sound file. The form stores an array of all uploaded sounds and keeps track of the current index of this array to determine which tab is open. If this index is -1, then the collection tab is open. Upon submission, one massive formData is sent to the backend containing both collection and sound data. On the backend, all database manipulations are grouped into one transaction, with the collection save/update preceding the sound save/updates.

### Search

Sound Collections and Sounds are searched by title and description using the pg-search gem on the backend.
