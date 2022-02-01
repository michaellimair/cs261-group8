import ApiError from './ApiError';

class UnprocessableEntityApiError<T extends any> extends ApiError<T> {
  constructor(message?: string, data?: T) {
    super(message ?? 'Entity has unprocessable values', data);
  }

  static isUnprocessableEntityApiError<T>(obj: any): obj is UnprocessableEntityApiError<T> {
    return obj instanceof UnprocessableEntityApiError;
  }
}

export default UnprocessableEntityApiError;
