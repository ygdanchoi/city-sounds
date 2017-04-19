export const fetchUsers = (id) => {
  return $.ajax({
    method: 'GET',
    url: '/api/users/',
    error: err => console.log(err),
  });
};

export const fetchUser = (id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${id}`,
    error: err => console.log(err),
  });
};
