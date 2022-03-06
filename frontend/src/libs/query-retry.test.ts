import NotFoundError from 'api/error/NotFoundError';
import UnauthorizedError from 'api/error/UnauthorizedError';
import { queryRetryCondition } from './query-retry';

describe('libs/query-retry', () => {
  describe('queryRetryCondition', () => {
    it('retries if there are less than 3 errors', () => {
      expect(queryRetryCondition(0, new Error())).toBe(true);
    });

    it('does not retry for unauthorized errors', () => {
      expect(queryRetryCondition(0, new UnauthorizedError())).toBe(false);
    });

    it('does not retry for not found errors', () => {
      expect(queryRetryCondition(0, new NotFoundError())).toBe(false);
    });
  });
});
