import { formatDate, formatTime } from './date';

describe('libs/date', () => {
  const timeZone = 'America/Los_Angeles';
  const timeString = '2012-01-01T00:00:00Z';

  describe('formatDate', () => {
    it('formats date strings as intended', () => {
      const dt = new Date(timeString);

      expect(formatDate(dt, timeZone)).toBe('31 Dec 2011');
    });
  });

  describe('formatTime', () => {
    it('formats time strings as intended', () => {
      const dt = new Date(timeString);

      expect(formatTime(dt, timeZone)).toBe('16:00');
    });
  });

  describe('formatDateTime', () => {
    it('formats time strings as intended', () => {
      const dt = new Date(timeString);

      expect(formatTime(dt, timeZone)).toBe('Saturday, 31 December 2011, 16:00 GMT-8');
    });
  });
});
