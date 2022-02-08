import AuthAPI from './auth.api';

export const httpClient = {
  auth: new AuthAPI(),
};
