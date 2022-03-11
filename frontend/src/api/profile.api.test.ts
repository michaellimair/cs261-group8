/* eslint-disable max-classes-per-file */
import UserProfileAPI from './profile.api';
import BaseAPI from './base.api';

class StubBaseAPI extends BaseAPI {
  public get = jest.fn();

  public patch = jest.fn();
}

describe('profile.api.ts', () => {
  let userProfileApi: UserProfileAPI;
  let api: BaseAPI;
  const id: number = 1;

  beforeEach(() => {
    api = new StubBaseAPI();
    userProfileApi = new UserProfileAPI(api);
  });

  it('instantiates successfully', () => {
    expect(() => new UserProfileAPI(api)).not.toThrow();
  });

  describe('getProfile', () => {
    it('gets profile successfully', async () => {
      await userProfileApi.getProfile(id);

      expect(api.get).toHaveBeenCalledTimes(1);
      expect(api.get).toHaveBeenCalledWith({
        path: `/users/${id}/profile/`,
      });
    });
  });

  describe('updateProfile', () => {
    it('updates profile successfully', async () => {
      await userProfileApi.updateProfile(id, { years_experience: 20 });

      expect(api.patch).toHaveBeenCalledTimes(1);
      expect(api.patch).toHaveBeenCalledWith({
        path: `/users/${id}/profile/`,
        body: {
          years_experience: 20,
        },
      });
    });
  });
});
