import { ICountry } from 'customTypes/country';
import BaseAPI from './base.api';
import CommonAPI from './common.api';

/**
 * API class which wraps all authentication methods.
 */
class CountryAPI extends CommonAPI {
  constructor(
    private readonly api: BaseAPI,
  ) {
    super('/countries');
  }

  listCountries = (query?: string): Promise<ICountry[]> => this.api.get<ICountry[]>({
    path: this.getPath(''),
    query: {
      q: query,
    },
  });

  getCountryByCode = (
    code: string,
  ): Promise<ICountry> => this.api.get<ICountry>({
    path: this.getPath(`/${code}`),
  });
}

export default CountryAPI;
