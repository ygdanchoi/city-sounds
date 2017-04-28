export const fetchAllSounds = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/sounds/',
    error: err => console.log(err),
  });
};

export const searchSounds = (query) => {
  return $.ajax({
    method: 'GET',
    url: `/api/search-sounds?query=${query}`,
    error: err => console.log(err),
  });
};

export const fetchCollectionSounds = (collectionId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/collections/${collectionId}/sounds/`,
    error: err => console.log(err),
  });
};


export const fetchSound = (id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/sounds/${id}`,
    error: err => console.log(err),
  });
};

export const deleteSound = (id) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/sounds/${id}`,
    error: err => console.log(err),
  });
};
