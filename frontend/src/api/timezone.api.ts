import { ITimezone } from 'customTypes/timezone';
import urljoin from 'url-join';
import BaseAPI from './base.api';

/**
 * API class which wraps all authentication methods.
 */
class TimezoneAPI {
  private basePath: string;

  constructor(
    private readonly api: BaseAPI,
  ) {
    this.basePath = '/timezones';
  }

  private getPath = (path: string) => urljoin(this.basePath, path);

  listTimezones = (): Promise<ITimezone[]> => this.api.get<ITimezone[]>({
    path: this.getPath(''),
  });
}

export default TimezoneAPI;
