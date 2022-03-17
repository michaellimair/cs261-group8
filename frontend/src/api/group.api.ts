import { IUserGroup } from 'customTypes/auth';
import BaseAPI from './base.api';
import CommonAPI from './common.api';

/**
 * API class which lists the available user groups for signup.
 */
class GroupAPI extends CommonAPI {
  constructor(
    private readonly api: BaseAPI,
  ) {
    super('/groups');
  }

  listGroups = (): Promise<IUserGroup[]> => this.api.get<IUserGroup[]>({
    path: this.getPath(''),
  });
}

export default GroupAPI;
