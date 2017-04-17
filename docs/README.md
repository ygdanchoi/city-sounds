# CityHum

[Heroku link][heroku]

[Trello link][trello]

[heroku]: http://www.herokuapp.com
[trello]: https://trello.com/b/Kyp8xWZd

## Minimum Viable Product

CityHum is a place to share & play ambient sounds. Inspired by Bandcamp, CityHum is built using Ruby on Rails and React/Redux. By the end of Week 9, this app will, at a minimum, satisfy the following criteria with smooth, bug-free navigation, adequate seed data and sufficient CSS styling.

1. New account creation, login, and guest/demo login
2. Production README
3. Hosting on Heroku
4. User profile page
  * Users can browse through other users' profile pages from the home page.
  * Users' profile pages list the user's uploaded sound collections.
  * Users can add new sound collections from their own profile pages.
5. Sound player
  * Sounds can be played from sound collection pages.
  * Playback can be paused/resumed.
  * Playback can jump to a specific time.
6. Search
  * Sounds, sound collections, and users can be searched by title/name.
  * Search results link to either user profile pages or sound collection pages.
  * Search results are paginated.
7. Upload/download sounds
  * Sound collections can be created and updated via a form.
  * Sound collections can contain multiple sounds.
Sound data is uploaded from local storage to an external hosting service.

## Design Docs

* [View Wireframes][wireframes]
* [React Components][components]
* [API endpoints][api-endpoints]
* [DB schema][schema]
* [Sample State][sample-state]

[wireframes]: wireframes
[components]: component-hierarchy.md
[sample-state]: sample-state.md
[api-endpoints]: api-endpoints.md
[schema]: schema.md

## Implementation Timeline

### Phase 1: Backend setup and front end user authentication (2 days)

**Objective:** Functioning Rails project with front-end Authentication.

### Phase 2: Explore List & User models & components (2 days)

**Objective:** Users can browse through other users' profiles.

### Phase 3: Sounds & Collections models, APIs, and components (3 days)

**Objective:** Sound collections can be created, read, edited, and destroyed through the API.

### Phase 4: Uploads/Downloads & Sound Player (1 day)

**Objective:** Sounds can be uploaded, downloaded, and played from users' profiles.

### Phase 5: Search (1 day)

**Objective:** Sounds, sound collections, and users can be searched by title/name.
