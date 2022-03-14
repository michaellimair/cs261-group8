import { IEvent } from 'customTypes/event';
import BaseAPI from './base.api';
import CommonAPI from './common.api';

/**
 * API class which wraps all authentication methods.
 */
class EventAPI extends CommonAPI {
  constructor(
    private readonly api: BaseAPI,
  ) {
    super('/events');
  }

  listEvents = (): Promise<IEvent[]> => this.api.get<IEvent[]>({
    path: this.getPath(''),
  });
}

export default EventAPI;
