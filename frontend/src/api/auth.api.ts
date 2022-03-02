import {
  IUser, IRegistration, ILogin, ILoginResult,
} from 'customTypes/auth';
import CredentialManager from 'libs/credential-manager';
import urljoin from 'url-join';
import BaseAPI from './base.api';

/**
 * API class which wraps all authentication methods.
 */
class AuthAPI {
  private basePath: string;

  constructor(
    private readonly api: BaseAPI,
    private readonly credentialManager: CredentialManager,
  ) {
    this.basePath = '/auth';
  }

  private getPath = (path: string) => urljoin(this.basePath, path);

  register = (payload: IRegistration): Promise<IUser> => this.api.post({
    path: this.getPath('/register'),
    body: payload,
  });

  login = async (payload: ILogin): Promise<ILoginResult> => {
    const response = await this.api.post<ILoginResult, ILogin>({
      path: this.getPath('/login'),
      body: payload,
    });

    this.credentialManager.setCredentials(response.token, response.expiry);

    return response;
  };

  logout = async (): Promise<void> => {
    const response = await this.api.post<void>({
      path: this.getPath('/logout'),
    });

    this.credentialManager.clearCredentials();

    return response;
  };

  me = (): Promise<IUser> => this.api.get({
    path: this.getPath(''),
  });
}

export default AuthAPI;
