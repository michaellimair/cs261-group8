import CredentialManager from 'libs/credential-manager';
import AuthAPI from './auth.api';
import BaseAPI from './base.api';

class HttpClient {
  constructor(
    private readonly credentialManager = new CredentialManager(),
    private readonly baseApi: BaseAPI = new BaseAPI({ credentialManager }),
    readonly auth: AuthAPI = new AuthAPI(baseApi, credentialManager),
    private readonly storage: Storage = localStorage,
  ) {}
}

export const httpClient = new HttpClient();
