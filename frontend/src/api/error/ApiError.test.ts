import ApiError from './ApiError';

describe('ApiError', () => {
  it('is instantiated successfully', () => {
    interface ISampleError {
      status_code: number;
      message: string;
    }

    const errorData = {
      status_code: 500,
      message: 'An error has occurred',
    };

    const err = new ApiError<ISampleError>(errorData.message, errorData);

    expect(err.data).toMatchObject(errorData);
    expect(err).toMatchSnapshot();
  });

  it('uses the default error message when instantiated without any arguments', () => {
    const err = new ApiError<any>();

    expect(err.message).toBe(ApiError.defaultMessage);
  });

  describe('isApiError', () => {
    it('identifies ApiError classes correctly', () => {
      const err = new ApiError<undefined>('Unknown error');

      expect(ApiError.isApiError(err)).toBe(true);
    });
  });
});
