import ApiError from './ApiError';
import BadRequestApiError from './BadRequestApiError';

describe('BadRequestApiError', () => {
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

    const err = new BadRequestApiError<ISampleError>('An error has occurred', errorData.errors);

    expect(err.data).toMatchObject(errorData.errors);
    expect(err).toMatchSnapshot();
  });

  it('is instantiated successfully with no message', () => {
    const err = new BadRequestApiError();

    expect(err.data).toBeUndefined();
    expect(err.message).toBe(BadRequestApiError.defaultMessage);
  });

  it('is a subclass of ApiError', () => {
    const err = new BadRequestApiError<unknown>('', []);

    expect(ApiError.isApiError(err)).toBe(true);
  });

  describe('isBadRequestApiError', () => {
    it('identifies BadRequestApiError classes correctly', () => {
      const err = new BadRequestApiError<undefined>('', []);

      expect(BadRequestApiError.isBadRequestApiError(err)).toBe(true);
    });
  });
});
