import CredentialManager from 'libs/credential-manager';
import AuthAPI from './auth.api';
import BaseAPI from './base.api';
import FeedbackAPI from './feedback.api';

class HttpClient {
  constructor(
    private readonly credentialManager = new CredentialManager(),
    private readonly baseApi: BaseAPI = new BaseAPI({ credentialManager }),
    readonly auth: AuthAPI = new AuthAPI(baseApi, credentialManager),
    private readonly storage: Storage = localStorage,
    readonly feedback: FeedbackAPI = new FeedbackAPI(baseApi),
  ) {}
}

export const httpClient = new HttpClient();
