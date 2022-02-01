import ApiError from './ApiError';
import UnauthorizedError from './UnauthorizedError';

describe('UnauthorizedError', () => {
  it('is instantiated successfully', () => {
    const errorData = {
      status_code: 400,
      message: 'An error has occurred',
      errors: [],
    };

    const err = new UnauthorizedError(errorData.message);

    expect(err.message).toBe(errorData.message);
    expect(err).toMatchSnapshot();
  });

  it('is a subclass of ApiError', () => {
    const err = new UnauthorizedError('error');

    expect(ApiError.isApiError(err)).toBe(true);
  });

  describe('isUnauthorizedError', () => {
    it('identifies UnauthorizedError classes correctly', () => {
      const err = new UnauthorizedError('error');

      expect(UnauthorizedError.isUnauthorizedError(err)).toBe(true);
    });
  });
});
