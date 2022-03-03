import ApiError from './ApiError';

class NotFoundError extends ApiError<never> {
  static defaultMessage: string = 'Not Found';

  constructor(message?: string) {
    super(message ?? NotFoundError.defaultMessage);
  }

  static isNotFoundError(obj: any): obj is NotFoundError {
    return obj instanceof NotFoundError;
  }
}

export default NotFoundError;
