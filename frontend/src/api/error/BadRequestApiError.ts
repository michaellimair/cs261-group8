import ApiError from './ApiError';

class BadRequestApiError<T = Record<string, string>> extends ApiError<T> {
  static defaultMessage = 'Validation error in the data.';

  constructor(message?: string, meta?: T) {
    super(message ?? BadRequestApiError.defaultMessage, meta);
  }

  static isBadRequestApiError<Res>(obj: any): obj is BadRequestApiError<Res> {
    return obj instanceof BadRequestApiError;
  }
}

export default BadRequestApiError;
