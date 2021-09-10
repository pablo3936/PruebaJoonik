import {User} from '../assets/models/';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUser = (): Promise<User | null> => {
  return new Promise((resolve, _reject) => {
    AsyncStorage.getItem('user')
      .then(response => {
        let user: any = response;
        if (user) {
          user = JSON.parse(user);
          if (user?.token) {
            resolve(user);
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      })
      .catch(_error => resolve(null));
  });
};

export const saveUser = (
  user?: User | null,
): Promise<User | null | undefined> => {
  return new Promise((resolve, _reject) => {
    if (user?.token) {
      AsyncStorage?.setItem('user', JSON.stringify(user)).finally(() =>
        resolve(user),
      );
    } else {
      AsyncStorage.removeItem('user').finally(() => resolve(user));
    }
  });
};
