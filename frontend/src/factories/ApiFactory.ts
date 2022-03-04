import BaseAPI from 'api/base.api';

/* eslint-disable class-methods-use-this */
export class ApiFactory {
  create = (): BaseAPI => ({
    get: jest.fn(),

    post: jest.fn(),

    patch: jest.fn(),

    put: jest.fn(),

    delete: jest.fn(),
  }) as unknown as BaseAPI;
}
