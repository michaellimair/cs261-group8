import ApiError from './ApiError';
import NotFoundError from './NotFoundError';

describe('NotFoundError', () => {
  it('is instantiated successfully', () => {
    const errorData = {
      status_code: 404,
      message: 'An error has occurred',
      errors: [],
    };

    const err = new NotFoundError(errorData.message);

    expect(err.message).toBe(errorData.message);
    expect(err.data).toMatchObject(errorData);
    expect(err).toMatchSnapshot();
  });

  it('is a subclass of ApiError', () => {
    const err = new NotFoundError('err');

    expect(ApiError.isApiError(err)).toBe(true);
  });

  it('uses the default error message when instantiated without any arguments', () => {
    const err = new NotFoundError();

    expect(err.message).toBe(NotFoundError.defaultMessage);
  });

  describe('isNotFoundError', () => {
    it('identifies NotFoundError classes correctly', () => {
      const err = new NotFoundError('err');

      expect(NotFoundError.isNotFoundError(err)).toBe(true);
    });
  });
});
