import { ILanguage } from 'customTypes/language';
import BaseAPI from './base.api';
import CommonAPI from './common.api';

/**
 * API class which wraps all authentication methods.
 */
class LanguageAPI extends CommonAPI {
  constructor(
    private readonly api: BaseAPI,
  ) {
    super('/languages');
  }

  listLanguages = (): Promise<ILanguage[]> => this.api.get<ILanguage[]>({
    path: this.getPath(''),
  });
}

export default LanguageAPI;
