export const fetchAllTags = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/tags/',
  });
};