import ApiError from './ApiError';
import UnprocessableEntityApiError from './UnprocessableEntityApiError';

describe('UnprocessableEntityApiError', () => {
  it('is instantiated successfully', () => {
    const errorData = {
      status_code: 400,
      message: 'An error has occurred',
      errors: [],
    };

    const err = new UnprocessableEntityApiError(errorData.message);

    expect(err.message).toBe(errorData.message);
    expect(err).toMatchSnapshot();
  });

  it('is a subclass of ApiError', () => {
    const err = new UnprocessableEntityApiError('error');

    expect(ApiError.isApiError(err)).toBe(true);
  });

  describe('isUnprocessableEntityApiError', () => {
    it('identifies UnprocessableEntityApiError classes correctly', () => {
      const err = new UnprocessableEntityApiError('error');

      expect(UnprocessableEntityApiError.isUnprocessableEntityApiError(err)).toBe(true);
    });
  });
});
