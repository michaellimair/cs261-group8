import ApiError from './ApiError';

class UnauthorizedError extends ApiError<null> {
  static defaultMessage = 'Unauthorized';

  constructor(message?: string) {
    super(message ?? UnauthorizedError.defaultMessage, null);
  }

  static isUnauthorizedError(obj: any): obj is UnauthorizedError {
    return obj instanceof UnauthorizedError;
  }
}

export default UnauthorizedError;
