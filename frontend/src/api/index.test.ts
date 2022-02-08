import { httpClient } from 'api';
import AuthAPI from './auth.api';

describe('api', () => {
  describe('httpClient', () => {
    it('initializes the api clients properly', async () => {
      expect(httpClient.auth instanceof AuthAPI).toBe(true);
    });
  });
});
