import { ITimezone } from 'customTypes/timezone';
import BaseAPI from './base.api';
import CommonAPI from './common.api';

/**
 * API class which wraps all authentication methods.
 */
class TimezoneAPI extends CommonAPI {
  constructor(
    private readonly api: BaseAPI,
  ) {
    super('/timezones');
  }

  listTimezones = (): Promise<ITimezone[]> => this.api.get<ITimezone[]>({
    path: this.getPath(''),
  });
}

export default TimezoneAPI;
