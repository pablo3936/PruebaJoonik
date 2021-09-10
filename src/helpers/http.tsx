import axios from 'axios';
import {showToast} from './toast';
import {getUser, saveUser} from './user';

import * as navigation from './navigation';

export const globalHeaders = {
  Accept: 'application/json',
};
export const instance = axios.create({
  baseURL: 'https://api.joonik.com',
  headers: {
    Accept: 'application/json',
  },
});

instance.interceptors.request.use(
  async config => {
    const _config = {
      ...config,
    };

    const user = await getUser();
    if (user?.token) {
      _config.headers.Authorization = `Bearer ${user?.token}`;
    }

    return _config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error?.response?.status === 401) {
      await saveUser();
      navigation?.reset({
        index: 0,
        routes: [{name: 'LoginEmail'}],
      });
    } else {
      if (
        typeof error?.response?.data?.error === 'string' &&
        error?.response?.data?.error?.trim()
      ) {
        showToast(error?.response?.data?.error?.trim(), {
          status: 'error',
        });
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
