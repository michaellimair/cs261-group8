import ApiError from './ApiError';

interface ValidationErrorMeta<T> {
  property: keyof T,
  value: T[keyof T];
}

class ValidationApiError<T = Record<string, string>> extends ApiError<ValidationErrorMeta<T>[]> {
  constructor(meta: ValidationErrorMeta<T>[]) {
    super('Validation error in the data.', meta);
  }

  static isValidationError<Res>(obj: any): obj is ValidationApiError<Res> {
    return obj instanceof ValidationApiError;
  }
}

export default ValidationApiError;
