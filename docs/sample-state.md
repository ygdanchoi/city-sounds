```js
{
  sessions: {
    currentUser: {
      id: 1,
      username: 'dan',
      profilePicUrl: 'user001.png',
      bio: 'Med school reject, aspiring supervillain.',
      location: 'New Jersey',
    },
    errors: {
      base: ['Invalid username or password'],
      username: ["can't be blank"],
      password: ['is too short (minimum is 6 characters)'],
    },
  },
  users: {
    1: {
      id: 1,
      username: 'dan',
      profilePicUrl: 'user001.png',
      bio: 'Med school reject, aspiring supervillain.',
      location: 'New Jersey',
      collectionIds: [1],
    },
  },
  exploreListItems: {
    collectionIds: [1],
  },
  searchResults: {
    collectionIds: [1],
    userIds: [1],
    soundIds: [1],
  },
  collections: {
    1: {
      id: 1,
      userId: 1,
      title: 'Central Park Sounds',
      artworkUrl: 'collection001.png',
      description: 'Ambient noise from Central Park',
      numSounds: 1,
      length: 2423
      tags: {
        1: {
          id: 1,
          name: 'park',
        },
      },
    },
  },
  sounds: {
    1: {
      id: 1,
      title: 'Sunday Afternoon Stroll',
      length: 2423,
      streamUrl: 'https://www.sounds.com/12345/',
      downloadUrl: 'https://www.sounds.com/download/12345/',
    },
  },
}
```
