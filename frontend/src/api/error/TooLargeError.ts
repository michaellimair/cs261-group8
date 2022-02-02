import ApiError from './ApiError';

class TooLargeError<T extends any> extends ApiError<T> {
  static defaultMessage: string = 'File too large';

  constructor(message?: string, data?: T) {
    super(message ?? TooLargeError.defaultMessage, data);
  }

  static isTooLargeError<T>(obj: any): obj is TooLargeError<T> {
    return obj instanceof TooLargeError;
  }
}

export default TooLargeError;
