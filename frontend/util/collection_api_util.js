export const fetchAllCollections = (params) => {
  return $.ajax({
    method: 'GET',
    url: `/api/collections/${params}`,
  });
};

export const searchCollections = (query) => {
  return $.ajax({
    method: 'GET',
    url: `/api/search-collections?query=${query}`,
  });
};

export const fetchUserCollections = (userId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${userId}/collections/`,
  });
};

export const fetchCollection = (id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/collections/${id}`,
  });
};

export const createCollection = (formData) => {
  return $.ajax({
    method: 'POST',
    url: '/api/collections',
    contentType: false,
    processData: false,
    data: formData,
  });
};

export const updateCollection = (id, formData) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/collections/${id}`,
    contentType: false,
    processData: false,
    data: formData,
  });
};

export const deleteCollection = (id) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/collections/${id}`,
  });
};
