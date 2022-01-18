import { isIsoDateString } from './base.api';

describe('BaseAPI', () => {
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
});
