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

export const updateUser = (user) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/users/${user.id}`,
    data: { user: user },
    error: err => console.log(err),
  });
};
