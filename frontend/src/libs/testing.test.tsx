import { tick } from './testing';

describe('testing', () => {
  describe('tick', () => {
    it('runs a setTimeout with a specified duration', async () => {
      const timeoutSpy = jest.spyOn(global, 'setTimeout');

      await tick(1);

      expect(timeoutSpy).toHaveBeenCalledTimes(1);
      expect(timeoutSpy).toHaveBeenCalledWith(expect.any(Function), 1);
    });
  });
});
