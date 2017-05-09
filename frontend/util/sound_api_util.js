export const fetchAllSounds = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/sounds/',
  });
};

export const searchSounds = (query) => {
  return $.ajax({
    method: 'GET',
    url: `/api/search-sounds?query=${query}`,
  });
};

export const fetchCollectionSounds = (collectionId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/collections/${collectionId}/sounds/`,
  });
};


export const fetchSound = (id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/sounds/${id}`,
  });
};

export const deleteSound = (id) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/sounds/${id}`,
  });
};
