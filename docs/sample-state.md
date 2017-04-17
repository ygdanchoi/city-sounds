```js
{
  currentUser: {
    id: 1,
    username: 'dan',
    imageUrl: 'user001.png',
  },
  formErrors: {
    signUp: {
      errors: {},
    },
    logIn: {
      errors: {},
    },
    newCollection: {
      errors: {},
    },
    editCollection: {
      errors: {},
    },
  },
  users: {
    1: {
      id: 1,
      username: 'dan',
      imageUrl: 'user001.png',
      bio: 'Med school reject, aspiring supervillain.',
      location: 'New Jersey',
    },
  },
  exploreListItems: {
    collections: {
      1: {
        id: 1,
        user: {
          id: 1,
          username: 'dan',
        },
        title: 'Central Park Sounds',
        artworkUrl: 'collection001.png',
        sounds: {
          1: {
            id: 1,
            name: 'Sunday Afternoon Stroll'
            length: 2423,
          },
        },
        tags: {
          1: {
            id: 1,
            name: 'park',
          },
        },
      },
    },
  }
  searchResults: {
    sounds: {
      1: {
        id: 1,
        collection: {
          user: {
            id: 1,
            username: 'dan',
          },
          tags: {
            1: {
              id: 1,
              name: 'park',
            },
          },
        },
        title: 'Sunday Afternoon Stroll',
        length: 2423,
      },
    },
    users: {
      1: {
        id: 1,
        username: 'dan',
        imageUrl: 'user001.png',
        location: 'New Jersey',
      },
    },
    collections: {
      1: {
        id: 1,
        user: {
          id: 1,
          username: 'dan',
        },
        title: 'Central Park Sounds',
        artworkUrl: 'collection001.png',
        sounds: {
          1: {
            id: 1,
            length: 2423,
          },
        },
        tags: {
          1: {
            id: 1,
            name: 'park',
          },
        },
      },
    },
  },
  collections: {
    1: {
      id: 1,
      userId: 1,
      title: 'Central Park Sounds',
      artworkUrl: 'collection001.png',
      description: 'Ambient noise from Central Park',
      sounds: {
        1: {
          id: 1,
          title: 'Sunday Afternoon Stroll',
          length: 2423,
          streamUrl: 'https://www.sounds.com/12345/',
          downloadUrl: 'https://www.sounds.com/download/12345/',
        },
      },
      tags: {
        1: {
          id: 1,
          name: 'park',
        },
      },
    },
  },
}
```
