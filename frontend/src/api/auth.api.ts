import {
  IUser, IRegistration, ILogin, ILoginResult,
} from 'customTypes/auth';
import BaseAPI from './base.api';

class AuthAPI extends BaseAPI {
  constructor() {
    super();
    this.basePath = '/auth';
  }

  register = (payload: IRegistration): Promise<IUser> => this.post({
    path: '/register',
    body: payload,
  });

  login = (payload: ILogin): Promise<ILoginResult> => this.post({
    path: '/login',
    body: payload,
  });

  logout = (): Promise<IUser> => this.post({
    path: '/logout',
  });
}

export default AuthAPI;
