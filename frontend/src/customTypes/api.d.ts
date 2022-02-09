type ApiBadRequestErrorKeys<T> = keyof T | 'non_field_errors';

export type IApiBadRequestErrorData<U> = {
  [key in ApiBadRequestErrorKeys<U>]: string[];
};
