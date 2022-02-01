import ApiError from './ApiError';

class UnauthorizedError extends ApiError<null> {
  constructor(message?: string) {
    super(message ?? 'Unauthorized', null);
  }

  static isUnauthorizedError(obj: any): obj is UnauthorizedError {
    return obj instanceof UnauthorizedError;
  }
}

export default UnauthorizedError;
