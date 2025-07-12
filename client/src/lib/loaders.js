// client/src/lib/loaders.js
import { defer } from 'react-router-dom';
import apiRequest from './apiRequest';

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest('/posts/' + params.id);
  return res.data;
};

export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split('?')[1];
  const postPromise = apiRequest('/posts?' + query);
  return defer({
    postResponse: postPromise,
  });
};

export const profilePageLoader = async () => {
  const postPromise = apiRequest('/users/profilePosts');
  // Removido chatPromise já que não usamos mais chat socket
  return defer({
    postResponse: postPromise,
  });
};
