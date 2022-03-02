import {
  IUser, IRegistration, ILogin, ILoginResult,
} from 'customTypes/auth';
import CredentialManager from 'libs/credential-manager';
import BaseAPI from './base.api';

/**
 * API class which wraps all authentication methods.
 */
class AuthAPI {
  constructor(
    private readonly api: BaseAPI,
    private readonly credentialManager: CredentialManager,
  ) {}

  register = (payload: IRegistration): Promise<IUser> => this.api.post({
    path: '/register',
    body: payload,
  });

  login = async (payload: ILogin): Promise<ILoginResult> => {
    const response = await this.api.post<ILoginResult, ILogin>({
      path: '/login',
      body: payload,
    });

    this.credentialManager.setCredentials(response.token, response.expiry);

    return response;
  };

  logout = async (): Promise<IUser> => {
    const response = await this.api.post<IUser>({
      path: '/logout',
    });

    this.credentialManager.clearCredentials();

    return response;
  };

  me = (): Promise<IUser> => this.api.get({
    path: '',
  });
}

export default AuthAPI;
