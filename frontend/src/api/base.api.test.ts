import { AxiosInstance } from 'axios';
import BaseAPI, { handleDates, isIsoDateString } from './base.api';

const mockClient: Partial<AxiosInstance> = ({
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
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
});
jest.mock('axios', () => ({
  create: jest.fn(() => mockClient),
}));

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

    class StubBaseAPI extends BaseAPI {
      basePath = '/hello';
    }

    beforeAll(() => {
      api = new StubBaseAPI();
    });

    afterAll(() => {
      jest.resetAllMocks();
    });

    describe('get', () => {
      // TODO(michaellimair): Fix test case
      it.skip('invokes the axios.get method with the correct variables', async () => {
        await api.get({
          path: 'there',
          query: { a: 1 },
        });
        expect(mockClient.get).toHaveBeenCalledWith('/hello/there', {
          params: { a: 1 },
        });
      });
    });
  });
});
