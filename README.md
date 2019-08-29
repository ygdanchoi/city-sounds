# README

[CitySounds live][heroku]

[heroku]: https://city-sounds.herokuapp.com/#/

CitySounds is a full-stack web application for sharing and playing ambient city soundscapes. Based on Bandcamp, it utilizes Ruby on Rails with PostgreSQL on the backend and React.js with Redux on the frontend.

## Database

CitySounds allows visitors to browse through other users' collections and listen to sounds. Users who are logged in can also create, edit, and delete sound collections. In order to achieve this, I used three primary `ActiveRecord` models:
1. `user`
2. `collection` (analogous to an `album`)
3. `sound` (analogous to a `track`)

### User

At the PostgreSQL database level, a `user` is stored in a `users` table with the following columns:
- `id`
- `username`
- `bio` (optional)
- `location` (optional)
- Authentication information

In addition, `avatar` images are handled by the `paperclip` gem and stored on Amazon Simple Storage Service (S3).

### Sound Collection

The `collections` SQL table has the following columns:
- `id`
- `title`
- `user_id` (foreign key)
- `description` (optional)

In addition, `avatar` images are stored on Amazon S3 via `paperclip`.

### Sound

The `sounds` SQL table has the following columns:
- `id`
- `title`
- `collection_id` (foreign key)
- `description` (optional)

In addition, `audio` files are stored on Amazon S3 via `paperclip`.

## Features

### Exploring Collections

Upon entering the homepage, an AJAX request is made to fetch all `collection` objects, which are then rendered as `ExploreListItem` React components in the `Explore` section. Next to this is the `ExploreSoundPlayer` component, which utilizes `ReactAudioPlayer` to allow my custom-styled HTML elements to control audio playback. By default, the first `sound` of the first `collection` is loaded into the `ExploreSoundPlayer` state.

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

### Editing User Information

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

The sound collection page renders a `CollectionSoundPlayer` functionally identical to the `ExploreSoundPlayer` on the home page, except that there are `SoundListItems` for each `sound` in the `collection` instead of the `ExploreListItems` on the homepage. If the collection belongs to the `currentUser`, then Edit/Delete links are also available.

![collection_page](https://raw.githubusercontent.com/ygdanchoi/city-sounds/master/docs/clippings/collection_page.jpg)

### Adding/Editing Sound Collections

The `CollectionFormContainer` renders a multi-tabbed component consisting of a primary `CollectionFormCollectionSubForm` sub-component, plus additional `CollectionFormSoundSubForm` sub-components for each sound file uploaded. The `CollectionForm` state (code snippet below) centralizes the information necessary to switch between tabs.

```js
this.state = {
  artworkFile: null,
  artworkUrl: '/avatars/original/missing.png',
  sounds: [],
  soundsToDelete: [],
  title: '',
  description: '',
  currentForm: null,
  currentFormIdx: -1,
  submitted: false,
};
```
If the `currentFormIdx` is -1, the `CollectionFormCollectionSubForm` is rendered.

![collection_form_collection_sub_form](https://raw.githubusercontent.com/ygdanchoi/city-sounds/master/docs/clippings/collection_form_collection_sub_form.jpg)

If the `currentFormIdx` is 0 or greater, a `CollectionFormSoundSubForm` is rendered using `sounds[currentFormIdx]`, which is an array of `SoundListItems`.

![collection_form_sound_sub_form](https://raw.githubusercontent.com/ygdanchoi/city-sounds/master/docs/clippings/collection_form_sound_sub_form.jpg)

Submitting the form sends a single AJAX `POST`/`PATCH` request, pooling the `collection` and `sound` data together. In order to enforce database integrity, the backend groups the `collection` and `sound` actions into a single `ActiveRecord::Base.transaction` (code snippet below) in order to enforce database integrity.

```js
def create
  @collection = Collection.new(collection_params)
  begin
    ActiveRecord::Base.transaction do
      if @collection.save
        parse_and_save_sounds
        render 'api/collections/show'
      else
        render json: @collection.errors, status: 422
      end
    end
  rescue ActiveRecord::RecordInvalid => exception
    render json: { sounds: exception.message[19..-1].split(', ') }, status: 422
  rescue NoSoundsError => exception
    render json: { sounds: ['Must have at least one sound.'] }, status: 422
  end
end

def update
  @collection = Collection.find(params[:id])
  begin
    ActiveRecord::Base.transaction do
      if @collection.update(collection_params)
        parse_and_save_sounds
        render 'api/collections/show'
      else
        render json: @collection.errors, status: 422
      end
    end
  rescue ActiveRecord::RecordInvalid => exception
    render json: { sounds: exception.message[19..-1].split(', ') }, status: 422
  rescue NoSoundsError => exception
    render json: { sounds: ['Must have at least one sound.'] }, status: 422
  end
end
```

### Searching Sound Collections

Collections and Sounds are searched by `title` and `description` using the `pg-search` gem.

![search](https://raw.githubusercontent.com/ygdanchoi/city-sounds/master/docs/clippings/search.jpg)

## Future Directions

CitySounds is still a work in progress! Here are some of the next steps.

### Likes/Playlists

Bandcamp allows fans to add albums/tracks to their wishlist, which can later be revisited. A similar "liked sounds" and "playlist" functionality on CitySounds would make it much more appealing to users.

### Tags

On Bandcamp's homepage, featured albums can be filtered by genres such as rock, alternative, hip-hop/rap, etc. A similar tagging & filtering system would translate over very naturally to CitySounds; some possible tags might include `cafe`, `rain`, `china`, etc.

### Efficiency & Speed

As CitySounds grows, fetching all `collection` objects for the homepage will become increasingly slow. Returning a small number of `collection` objects per query would be a natural first step in scaling up. In addition, several of the AJAX calls to the backend can reasonably be consolidated together.
