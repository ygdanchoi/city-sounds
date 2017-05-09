export const fetchUsers = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/users/',
  });
};

export const fetchUser = (id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${id}`,
  });
};

export const updateUser = (user) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/users/${user.id}`,
    data: { user: user },
  });
};

export const updateUserAvatar = (id, formData) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/users/${id}`,
    contentType: false,
    processData: false,
    data: formData,
  });
};
