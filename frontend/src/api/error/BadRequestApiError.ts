import ApiError from './ApiError';

interface ValidationErrorMeta<T> {
  property: keyof T,
  value: T[keyof T];
}

class BadRequestApiError<T = Record<string, string>> extends ApiError<ValidationErrorMeta<T>[]> {
  constructor(meta: ValidationErrorMeta<T>[]) {
    super('Validation error in the data.', meta);
  }

  static isBadRequestApiError<Res>(obj: any): obj is BadRequestApiError<Res> {
    return obj instanceof BadRequestApiError;
  }
}

export default BadRequestApiError;