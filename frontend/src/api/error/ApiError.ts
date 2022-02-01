class ApiError<T> extends Error {
  data?: T;

  constructor(message: string, data?: T) {
    super(message ?? 'An error has occurred in the API.');
    this.data = data;
  }

  static isApiError(obj: any): obj is ApiError<any> {
    return obj instanceof ApiError;
  }
}

export default ApiError;
