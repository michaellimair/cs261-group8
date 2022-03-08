/* eslint-disable max-classes-per-file */
import { ApiFactory } from 'factories/ApiFactory';
import TimezoneAPI from './timezone.api';
import BaseAPI from './base.api';

describe('timezone.api.ts', () => {
  let timezoneApi: TimezoneAPI;
  let api: BaseAPI;

  beforeEach(() => {
    const apiFactory = new ApiFactory();
    api = apiFactory.create();
    timezoneApi = new TimezoneAPI(api);
  });

  it('instantiates successfully', () => {
    expect(() => new TimezoneAPI(api)).not.toThrow();
  });

  describe('listTimezones', () => {
    it('can list timezones successfully', async () => {
      await timezoneApi.listTimezones();

      expect(api.get).toHaveBeenCalledTimes(1);
      expect(api.get).toHaveBeenCalledWith({
        path: '/timezones',
        query: {
          q: undefined,
        },
      });
    });
  });
});
