/* eslint-disable global-require */
describe('appenv', () => {
  const OLD_ENV = process.env;
  let apiHost: string;

  beforeEach(() => {
    process.env = {
      PUBLIC_URL: 'PUBLICURL',
      NODE_ENV: 'test',
    };
    apiHost = 'apihost';
    jest.resetModules();
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  describe('APP_HOST', () => {
    it('extracts REACT_APP_API_HOST environment variables properly', () => {
      process.env = {
        ...OLD_ENV,
        REACT_APP_API_HOST: apiHost,
      };
      const { API_HOST } = require('appenv');
      expect(API_HOST).toBe(apiHost);
    });

    it('falls back to default api host', () => {
      const { API_HOST } = require('appenv');
      expect(API_HOST).toBe('http://localhost:8000/api');
    });
  });
});

// eslint-disable-next-line jest/no-export
export {};
