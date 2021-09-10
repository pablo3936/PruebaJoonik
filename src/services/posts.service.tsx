import {Post} from '../assets/models';

import http from '../helpers/http';

export const getPosts = (): Promise<Post[]> => {
  return new Promise((resolve, _reject) => {
    http
      .get('/posts')
      .then(response => {
        if (Array.isArray(response.data)) {
          resolve(response.data);
        } else {
          resolve([]);
        }
      })
      .catch(_error => resolve([]));
  });
};
