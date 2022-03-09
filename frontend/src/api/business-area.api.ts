import { IBusinessArea } from 'customTypes/auth';
import urljoin from 'url-join';
import BaseAPI from './base.api';

/**
 * API class for business area.
 */
class BusinessAreaAPI {
  private basePath: string;

  constructor(
    private readonly api: BaseAPI,
  ) {
    this.basePath = '/business-areas';
  }

  private getPath = (path: string) => urljoin(this.basePath, path);

  listBusinessAreas = (): Promise<IBusinessArea[]> => this.api.get<IBusinessArea[]>({
    path: this.getPath(''),
  });

  getBusinessAreaById = (id: number): Promise<IBusinessArea> => this.api.get<IBusinessArea>({
    path: this.getPath(`${id}`),
  });
}

export default BusinessAreaAPI;
