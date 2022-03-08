import { ICountry } from 'customTypes/country';
import urljoin from 'url-join';
import BaseAPI from './base.api';

/**
 * API class which wraps all authentication methods.
 */
class CountryAPI {
  private basePath: string;

  constructor(
    private readonly api: BaseAPI,
  ) {
    this.basePath = '/countries';
  }

  private getPath = (path: string) => urljoin(this.basePath, path);

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
