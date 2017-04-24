export const fetchAllSounds = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/sounds/',
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
