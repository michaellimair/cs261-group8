/* eslint-disable max-classes-per-file */
import { ApiFactory } from 'factories/ApiFactory';
import BusinessAreaAPI from './business-area.api';
import BaseAPI from './base.api';

describe('business-area.api.ts', () => {
  let businessAreaApi: BusinessAreaAPI;
  let api: BaseAPI;

  beforeEach(() => {
    const apiFactory = new ApiFactory();
    api = apiFactory.create();
    businessAreaApi = new BusinessAreaAPI(api);
  });

  it('instantiates successfully', () => {
    expect(() => new BusinessAreaAPI(api)).not.toThrow();
  });

  describe('listBusinessAreas', () => {
    it('can list business areas successfully', async () => {
      await businessAreaApi.listBusinessAreas();

      expect(api.get).toHaveBeenCalledTimes(1);
      expect(api.get).toHaveBeenCalledWith({
        path: '/business-areas',
      });
    });
  });

  describe('getBusinessAreaById', () => {
    it('gets the business area by id', async () => {
      const id = 2;
      await businessAreaApi.getBusinessAreaById(id);

      expect(api.get).toHaveBeenCalledTimes(1);
      expect(api.get).toHaveBeenCalledWith({
        path: `/business-areas/${id}`,
      });
    });
  });
});
