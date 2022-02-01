import ApiError from './ApiError';

class TooLargeError<T extends any> extends ApiError<T> {
  constructor(message?: string, data?: T) {
    super(message ?? 'File too large', data);
  }

  static isTooLargeError<T>(obj: any): obj is TooLargeError<T> {
    return obj instanceof TooLargeError;
  }
}

export default TooLargeError;
