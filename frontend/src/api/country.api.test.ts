/* eslint-disable max-classes-per-file */
import { ApiFactory } from 'factories/ApiFactory';
import CountryAPI from './country.api';
import BaseAPI from './base.api';

describe('country.api.ts', () => {
  let countryApi: CountryAPI;
  let api: BaseAPI;

  beforeEach(() => {
    const apiFactory = new ApiFactory();
    api = apiFactory.create();
    countryApi = new CountryAPI(api);
  });

  it('instantiates successfully', () => {
    expect(() => new CountryAPI(api)).not.toThrow();
  });

  describe('listCountries', () => {
    it('can list countries successfully without query', async () => {
      await countryApi.listCountries();

      expect(api.get).toHaveBeenCalledTimes(1);
      expect(api.get).toHaveBeenCalledWith({
        path: '/countries',
        query: {
          q: undefined,
        },
      });
    });

    it('can list countries successfully with search string', async () => {
      await countryApi.listCountries('Indo');

      expect(api.get).toHaveBeenCalledTimes(1);
      expect(api.get).toHaveBeenCalledWith({
        path: '/countries',
        query: {
          q: 'Indo',
        },
      });
    });
  });

  describe('getCountryByCode', () => {
    it('gets the country by code', async () => {
      const countryCode = 'ID';
      await countryApi.getCountryByCode(countryCode);

      expect(api.get).toHaveBeenCalledTimes(1);
      expect(api.get).toHaveBeenCalledWith({
        path: `/countries/${countryCode}`,
      });
    });
  });
});
