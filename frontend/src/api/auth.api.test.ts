/* eslint-disable max-classes-per-file */
import { IRegistration } from 'customTypes/auth';
import AuthAPI from './auth.api';
import BaseAPI from './base.api';

describe('auth.api.test.ts', () => {
  let authApi: AuthAPI;
  let api: BaseAPI;
  const username: string = 'testuser';
  const password: string = 'testpassword';

  beforeEach(() => {
    class StubBaseAPI extends BaseAPI {
      public get = jest.fn();

      public post = jest.fn();
    }
    api = new StubBaseAPI();
    authApi = new AuthAPI(api);
  });

  it('instantiates successfully', () => {
    expect(() => new AuthAPI()).not.toThrow();
  });

  describe('login', () => {
    it('logs in successfully', async () => {
      const body = {
        username,
        password,
      };
      await authApi.login(body);

      expect(api.post).toHaveBeenCalledTimes(1);
      expect(api.post).toHaveBeenCalledWith({
        path: '/login',
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
        path: '/register',
        body: registerBody,
      });
    });
  });

  describe('me', () => {
    it('gets current logged in user successfully', async () => {
      await authApi.me();

      expect(api.get).toHaveBeenCalledTimes(1);
      expect(api.get).toHaveBeenCalledWith({
        path: '',
      });
    });
  });

  describe('logout', () => {
    it('registers successfully', async () => {
      await authApi.logout();

      expect(api.post).toHaveBeenCalledTimes(1);
      expect(api.post).toHaveBeenCalledWith({
        path: '/logout',
      });
    });
  });
});
