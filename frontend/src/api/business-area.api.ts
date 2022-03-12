import { IBusinessArea } from 'customTypes/auth';
import BaseAPI from './base.api';
import CommonAPI from './common.api';

/**
 * API class for business area.
 */
class BusinessAreaAPI extends CommonAPI {
  constructor(
    private readonly api: BaseAPI,
  ) {
    super('/business-areas');
  }

  listBusinessAreas = (): Promise<IBusinessArea[]> => this.api.get<IBusinessArea[]>({
    path: this.getPath(''),
  });

  getBusinessAreaById = (id: number): Promise<IBusinessArea> => this.api.get<IBusinessArea>({
    path: this.getPath(`${id}`),
  });
}

export default BusinessAreaAPI;
