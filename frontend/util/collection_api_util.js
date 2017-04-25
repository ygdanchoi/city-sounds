export const fetchAllCollections = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/collections/',
    error: err => console.log(err),
  });
};

export const fetchUserCollections = (userId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${userId}/collections/`,
    error: err => console.log(err),
  });
};

export const fetchCollection = (id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/collections/${id}`,
    error: err => console.log(err),
  });
};

export const createCollection = (formData) => {
  return $.ajax({
    method: 'POST',
    url: '/api/collections',
    contentType: false,
    processData: false,
    data: formData,
    error: err => console.log(err),
  });
};
