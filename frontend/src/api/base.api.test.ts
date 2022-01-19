import BaseAPI, { handleDates, isIsoDateString } from './base.api';

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
    class StubBaseAPI extends BaseAPI {}

    it('can be initialized properly', () => {
      expect(() => new StubBaseAPI()).not.toThrow();
    });
  });
});
