import ApiError from './ApiError';
import TooLargeError from './TooLargeError';

describe('TooLargeError', () => {
  it('is instantiated successfully', () => {
    interface ISampleError {
      status_code: number;
      message: string;
    }

    const errorData = {
      status_code: 400,
      message: 'An error has occurred',
      errors: [],
    };

    const err = new TooLargeError<ISampleError>(errorData.message, errorData);

    expect(err.message).toBe(errorData.message);
    expect(err.data).toMatchObject(errorData);
    expect(err).toMatchSnapshot();
  });

  it('is a subclass of ApiError', () => {
    const err = new TooLargeError<unknown>('err', {});

    expect(ApiError.isApiError(err)).toBe(true);
  });

  describe('isTooLargeError', () => {
    it('identifies TooLargeError classes correctly', () => {
      const err = new TooLargeError<unknown>('err', {});

      expect(TooLargeError.isTooLargeError(err)).toBe(true);
    });
  });
});
