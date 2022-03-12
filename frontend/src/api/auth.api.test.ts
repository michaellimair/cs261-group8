/* eslint-disable max-classes-per-file */
import { IRegistration } from 'customTypes/auth';
import CredentialManagerFactory from 'factories/CredentialManagerFactory';
import CredentialManager from 'libs/credential-manager';
import AuthAPI from './auth.api';
import BaseAPI from './base.api';

const credentialManagerFactory = new CredentialManagerFactory();

class StubBaseAPI extends BaseAPI {
  public get = jest.fn();

  public post = jest.fn();
}

describe('auth.api.test.ts', () => {
  let authApi: AuthAPI;
  let api: BaseAPI;
  let credentialManager: CredentialManager;
  const username: string = 'testuser';
  const password: string = 'testpassword';

  beforeEach(() => {
    api = new StubBaseAPI();
    credentialManager = credentialManagerFactory.create();
    authApi = new AuthAPI(api, credentialManager);
  });

  it('instantiates successfully', () => {
    expect(() => new AuthAPI(api, credentialManager)).not.toThrow();
  });

  describe('login', () => {
    it('logs in successfully', async () => {
      const body = {
        username,
        password,
      };

      (api.post as jest.Mock).mockImplementationOnce(() => ({
        token: 'abc',
        expiry: new Date(),
      }));

      await authApi.login(body);

      expect(api.post).toHaveBeenCalledTimes(1);
      expect(credentialManager.setCredentials).toHaveBeenCalledTimes(1);
      expect(api.post).toHaveBeenCalledWith({
        path: '/auth/login',
        body,
      });
    });
  });

  describe('register', () => {
    const firstName = 'Test';
    const lastName = 'User';
    const email = 'testuser1@test.com';

    it('registers successfully', async () => {
      const registerBody: IRegistration = {
        username,
        password,
        verify_password: password,
        email,
        first_name: firstName,
        last_name: lastName,
      };
      await authApi.register(registerBody);

      expect(api.post).toHaveBeenCalledTimes(1);
      expect(api.post).toHaveBeenCalledWith({
        path: '/auth/register',
        body: registerBody,
      });
    });
  });

  describe('me', () => {
    it('gets current logged in user successfully', async () => {
      await authApi.me();

      expect(api.get).toHaveBeenCalledTimes(1);
      expect(api.get).toHaveBeenCalledWith({
        path: '/auth',
      });
    });
  });

  describe('logout', () => {
    it('logs out successfully', async () => {
      await authApi.logout();

      expect(api.post).toHaveBeenCalledTimes(1);
      expect(credentialManager.clearCredentials).toHaveBeenCalledTimes(1);
      expect(api.post).toHaveBeenCalledWith({
        path: '/auth/logout',
      });
    });
  });
});
