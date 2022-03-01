import {
  IUser, IRegistration, ILogin, ILoginResult,
} from 'customTypes/auth';
import BaseAPI from './base.api';

/**
 * API class which wraps all authentication methods.
 */
class AuthAPI {
  private api: BaseAPI;

  constructor(api?: BaseAPI) {
    this.api = api ?? new BaseAPI({
      basePath: '/auth',
    });
  }

  register = (payload: IRegistration): Promise<IUser> => this.api.post({
    path: '/register',
    body: payload,
  });

  login = (payload: ILogin): Promise<ILoginResult> => this.api.post({
    path: '/login',
    body: payload,
  });

  logout = (): Promise<IUser> => this.api.post({
    path: '/logout',
  });

  me = (): Promise<IUser> => this.api.get({
    path: '',
  });
}

export default AuthAPI;
