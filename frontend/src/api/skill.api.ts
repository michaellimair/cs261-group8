import urljoin from 'url-join';
import BaseAPI from './base.api';

/**
 * API class which wraps all authentication methods.
 */
class SkillAPI {
  private basePath: string;

  constructor(
    private readonly api: BaseAPI,
  ) {
    this.basePath = '/skills';
  }

  private getPath = (path: string) => urljoin(this.basePath, path);

  listSkills = (query?: string): Promise<string[]> => this.api.get<string[]>({
    path: this.getPath(''),
    query: {
      q: query,
    },
  });
}

export default SkillAPI;
