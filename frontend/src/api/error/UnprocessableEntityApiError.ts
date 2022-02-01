import ApiError from './ApiError';

class UnprocessableEntityApiError<T extends any> extends ApiError<T> {
  static defaultMessage: string = 'Entity has unprocessable value(s).';

  constructor(message?: string, data?: T) {
    super(message ?? UnprocessableEntityApiError.defaultMessage, data);
  }

  static isUnprocessableEntityApiError<T>(obj: any): obj is UnprocessableEntityApiError<T> {
    return obj instanceof UnprocessableEntityApiError;
  }
}

export default UnprocessableEntityApiError;
