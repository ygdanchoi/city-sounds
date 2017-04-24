export const fetchCollections = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/sounds/',
    error: err => console.log(err),
  });
};

export const fetchCollection = (id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/sounds/${id}`,
    error: err => console.log(err),
  });
};
