/* eslint-disable max-classes-per-file */
import { AxiosInstance } from 'axios';
import CredentialManagerFactory from 'factories/CredentialManagerFactory';
import CredentialManager from 'libs/credential-manager';
import BaseAPI, { handleDates, isIsoDateString } from './base.api';
import ApiError from './error/ApiError';
import BadRequestApiError from './error/BadRequestApiError';
import UnauthorizedError from './error/UnauthorizedError';
import UnprocessableEntityApiError from './error/UnprocessableEntityApiError';

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
  const mockIsoDate = '2022-01-18T18:42:06.930Z';
  describe('isIsoDateString', () => {
    it('returns false for non-date strings', () => {
      expect(isIsoDateString('aaaaa')).toBe(false);
    });

    it('returns false for date strings that are not in the ISO format', () => {
      expect(isIsoDateString('2022-01-18')).toBe(false);
    });

    it('returns true for ISO date strings', () => {
      expect(isIsoDateString(mockIsoDate)).toBe(true);
    });
  });

  describe('handleDates', () => {
    it('does not do anything to null objects', () => {
      expect(handleDates(null)).toBeNull();
    });

    it('converts shallowly nested ISO dates to a date object', () => {
      const obj = {
        a: mockIsoDate,
      };

      expect(handleDates(obj)).toMatchObject({
        a: new Date(mockIsoDate),
      });
    });

    it('converts deeply nested ISO dates to a date object', () => {
      const obj = {
        a: {
          d: mockIsoDate,
        },
      };

      expect(handleDates(obj)).toMatchObject({
        a: {
          d: new Date(mockIsoDate),
        },
      });
    });
  });

  const credentialManagerFactory = new CredentialManagerFactory();

  describe('BaseAPI', () => {
    let api: BaseAPI;
    let mockCredentialManager: CredentialManager;
    let mockClient: AxiosInstance;
    const mockPath = '/hello/there';

    beforeEach(() => {
      mockClient = createMockClient();
      mockCredentialManager = credentialManagerFactory.create();
      api = new BaseAPI({
        credentialManager: mockCredentialManager,
        client: mockClient,
        basePath: '/hello',
      });
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('instantiates successfully', () => {
      expect(() => new BaseAPI()).not.toThrow();
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

    it('injects an request token interceptor to the client given no options', () => {
      const passThruFn = (mockClient.interceptors.request.use as jest.Mock).mock.calls[0][0];
      expect(typeof passThruFn).toBe('function');
      const testObject = {};
      expect(passThruFn(testObject)).toMatchObject({
        headers: {
          Authorization: `Token ${mockCredentialManager.credentials.token}`,
        },
      });
    });

    it('injects an request token interceptor to the client given existing headers', () => {
      const passThruFn = (mockClient.interceptors.request.use as jest.Mock).mock.calls[0][0];
      expect(typeof passThruFn).toBe('function');
      const testObject = {
        headers: {
          Cookie: 'abc',
        },
      };
      expect(passThruFn(testObject)).toMatchObject({
        headers: {
          Cookie: 'abc',
          Authorization: `Token ${mockCredentialManager.credentials.token}`,
        },
      });
    });

    it('does not inject auth token if present in header', () => {
      const passThruFn = (mockClient.interceptors.request.use as jest.Mock).mock.calls[0][0];
      expect(typeof passThruFn).toBe('function');
      const testObject = {
        headers: {
          Authorization: 'abc',
        },
      };
      expect(passThruFn(testObject)).toMatchObject({
        headers: {
          Authorization: 'abc',
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

      class MockAxiosError extends Error {
        response: Record<string, any>;

        isAxiosError: boolean;

        constructor(status?: number, data?: Record<string, any>) {
          super('Mocked Axios Error');

          this.isAxiosError = true;

          this.response = {
            status: status ?? 500,
            data,
          };
        }
      }

      it('intercepts unknown errors properly', async () => expect(() => errorInterceptor(new Error('Unknown error'))).rejects.toEqual(new ApiError('An error has occurred in the server.')));

      it('intercepts unknown axios errors properly', async () => expect(async () => {
        await errorInterceptor(new MockAxiosError(503));
      }).rejects.toEqual(new ApiError('An error has occurred in the server.')));

      it('intercepts bad request errors with no error data properly', async () => expect(async () => {
        await errorInterceptor(new MockAxiosError(400));
      }).rejects.toEqual(new BadRequestApiError('Validation error in the data.')));

      const nonFieldError = {
        property: 'non_field_errors',
        value: [
          'Unable to log in with provided credentials.',
        ],
      };

      it('intercepts bad request errors with field error data properly', async () => expect(async () => {
        await errorInterceptor(new MockAxiosError(400, nonFieldError));
      }).rejects.toEqual(new BadRequestApiError('Validation error in the data.', nonFieldError)));

      it('intercepts unauthorized errors properly', async () => expect(async () => {
        await errorInterceptor(new MockAxiosError(401, { message: 'Please log in' }));
      }).rejects.toEqual(new UnauthorizedError('Please log in')));

      it('intercepts payload too large errors properly', async () => expect(async () => {
        await errorInterceptor(new MockAxiosError(413, { message: 'Payload too large' }));
      }).rejects.toEqual(new UnprocessableEntityApiError('Payload too large')));

      it('intercepts unprocessable entity errors properly', async () => expect(async () => {
        await errorInterceptor(new MockAxiosError(422, { message: 'Form input not valid' }));
      }).rejects.toEqual(new UnprocessableEntityApiError('Form input not valid')));
    });

    describe('get', () => {
      it('invokes the client.get method with the correct variables', async () => {
        await api.get({
          path: 'there',
          query: { a: 1 },
        });
        expect(mockClient.get).toHaveBeenCalledWith(mockPath, {
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
        expect(mockClient.post).toHaveBeenCalledWith(mockPath, body, {
          params: query,
        });
      });

      it('posts successfully without body or query', async () => {
        await api.post({
          path: 'there',
        });
        expect(mockClient.post).toHaveBeenCalledWith(mockPath, {}, {});
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
        expect(mockClient.patch).toHaveBeenCalledWith(mockPath, body, {
          params: query,
        });
      });

      it('patches successfully without body or query', async () => {
        await api.patch({
          path: 'there',
        });
        expect(mockClient.patch).toHaveBeenCalledWith(mockPath, {}, {});
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
        expect(mockClient.put).toHaveBeenCalledWith(mockPath, body, {
          params: query,
        });
      });

      it('puts successfully without body or query', async () => {
        await api.put({
          path: 'there',
        });
        expect(mockClient.put).toHaveBeenCalledWith(mockPath, {}, {});
      });
    });

    describe('delete', () => {
      it('invokes the client.delete method with the correct variables', async () => {
        await api.delete({
          path: 'there',
          query: { a: 1 },
        });
        expect(mockClient.delete).toHaveBeenCalledWith(mockPath, {
          params: { a: 1 },
        });
      });
    });
  });
});
