import BaseAPI from './base.api';
import CommonAPI from './common.api';

/**
 * API class which wraps all authentication methods.
 */
class SkillAPI extends CommonAPI {
  constructor(
    private readonly api: BaseAPI,
  ) {
    super('/skills');
  }

  listSkills = (query?: string): Promise<string[]> => this.api.get<string[]>({
    path: this.getPath(''),
    query: {
      q: query,
    },
  });
}

export default SkillAPI;
