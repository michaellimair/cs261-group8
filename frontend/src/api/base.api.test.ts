import { AxiosInstance } from 'axios';
import BaseAPI, { handleDates, isIsoDateString } from './base.api';
import ApiError from './error/ApiError';

const mockResponseCreator = () => jest.fn(() => new Promise<any>((res) => {
  res({ data: {} });
}));

const createMockClient: () => AxiosInstance = () => ({
  interceptors: {
    request: {
      use: jest.fn(),
      eject: jest.fn(),
    },
    response: {
      use: jest.fn(),
      eject: jest.fn(),
    },
  },
  get: mockResponseCreator(),
  post: mockResponseCreator(),
  put: mockResponseCreator(),
  patch: mockResponseCreator(),
  delete: mockResponseCreator(),
}) as unknown as AxiosInstance;

describe('base.api.ts', () => {
  describe('isIsoDateString', () => {
    it('returns false for non-date strings', () => {
      expect(isIsoDateString('aaaaa')).toBe(false);
    });

    it('returns false for date strings that are not in the ISO format', () => {
      expect(isIsoDateString('2022-01-18')).toBe(false);
    });

    it('returns true for ISO date strings', () => {
      expect(isIsoDateString('2022-01-18T18:42:06.930Z')).toBe(true);
    });
  });

  describe('handleDates', () => {
    it('does not do anything to null objects', () => {
      expect(handleDates(null)).toBeNull();
    });

    it('converts deeply nested ISO dates to a date object', () => {
      const obj = {
        a: {
          b: {
            c: {
              d: '2022-01-18T18:42:06.930Z',
            },
          },
        },
      };

      expect(handleDates(obj)).toMatchObject({
        a: {
          b: {
            c: {
              d: new Date('2022-01-18T18:42:06.930Z'),
            },
          },
        },
      });
    });
  });

  describe('BaseAPI', () => {
    let api: BaseAPI;
    let mockClient: AxiosInstance;

    class StubBaseAPI extends BaseAPI {
      basePath = '/hello';
    }

    beforeEach(() => {
      mockClient = createMockClient();
      api = new StubBaseAPI(mockClient);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('injects date interceptors to the client', () => {
      const handleDateFn = (mockClient.interceptors.response.use as jest.Mock).mock.calls[0][0];
      expect(typeof handleDateFn).toBe('function');
      const data = {
        createdAt: '2022-02-01T14:14:48.508Z',
      };

      const parsedData = handleDateFn({ data });

      expect(parsedData).toMatchObject({
        data: {
          createdAt: new Date('2022-02-01T14:14:48.508Z'),
        },
      });
    });

    it('injects an error interceptor to the client', () => {
      const passThruFn = (mockClient.interceptors.response.use as jest.Mock).mock.calls[1][0];
      expect(typeof passThruFn).toBe('function');
      const testObject = {};
      expect(passThruFn(testObject)).toMatchObject(testObject);

      const errorInterceptor = (mockClient.interceptors.response.use as jest.Mock).mock.calls[1][0];
      expect(typeof errorInterceptor).toBe('function');
    });

    describe('errorInterceptor', () => {
      let errorInterceptor: (err: Error) => any;

      beforeEach(() => {
        // eslint-disable-next-line prefer-destructuring
        errorInterceptor = (mockClient.interceptors.response.use as jest.Mock).mock.calls[1][1];
      });

      it.skip('intercepts unknown errors properly', async () => {
        expect(async () => {
          await errorInterceptor(new Error('Unknown error'));
        }).toThrow(new ApiError('An error has occurred in the server.'));
      });
    });

    describe('get', () => {
      it('invokes the client.get method with the correct variables', async () => {
        await api.get({
          path: 'there',
          query: { a: 1 },
        });
        expect(mockClient.get).toHaveBeenCalledWith('/hello/there', {
          params: { a: 1 },
        });
      });
    });

    describe('post', () => {
      it('invokes the client.post method with the correct variables', async () => {
        const body = { name: 'abc' };
        const query = { a: 1 };
        await api.post({
          path: 'there',
          query,
          body,
        });
        expect(mockClient.post).toHaveBeenCalledWith('/hello/there', body, {
          params: query,
        });
      });
    });

    describe('patch', () => {
      it('invokes the client.patch method with the correct variables', async () => {
        const body = { name: 'abc' };
        const query = { a: 1 };
        await api.patch({
          path: 'there',
          query,
          body,
        });
        expect(mockClient.patch).toHaveBeenCalledWith('/hello/there', body, {
          params: query,
        });
      });
    });

    describe('put', () => {
      it('invokes the client.put method with the correct variables', async () => {
        const body = { name: 'abc' };
        const query = { a: 1 };
        await api.put({
          path: 'there',
          query,
          body,
        });
        expect(mockClient.put).toHaveBeenCalledWith('/hello/there', body, {
          params: query,
        });
      });
    });

    describe('delete', () => {
      it('invokes the client.delete method with the correct variables', async () => {
        await api.delete({
          path: 'there',
          query: { a: 1 },
        });
        expect(mockClient.delete).toHaveBeenCalledWith('/hello/there', {
          params: { a: 1 },
        });
      });
    });
  });
});
