class ApiError<T> extends Error {
  data?: T;

  static defaultMessage = 'An error has occurred in the API.';

  constructor(message?: string, data?: T) {
    super(message ?? ApiError.defaultMessage);
    this.data = data;
  }

  static isApiError(obj: any): obj is ApiError<any> {
    return obj instanceof ApiError;
  }
}

export default ApiError;
