import {
  IUser, IRegistration, ILogin, ILoginResult, IUserUpdateDTO,
} from 'customTypes/auth';
import CredentialManager from 'libs/credential-manager';
import BaseAPI from './base.api';
import CommonAPI from './common.api';

/**
 * API class which wraps all authentication methods.
 */
class AuthAPI extends CommonAPI {
  constructor(
    private readonly api: BaseAPI,
    private readonly credentialManager: CredentialManager,
  ) {
    super('/auth');
  }

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

  update = (data: IUserUpdateDTO): Promise<IUser> => this.api.patch<IUser, IUserUpdateDTO>({
    path: this.getPath(''),
    body: data,
  });
}

export default AuthAPI;
