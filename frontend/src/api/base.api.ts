import { parseISO } from 'date-fns';

const isoDateFormat = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/;

/**
 *
 * Function to check whether or not a value is an ISO date string.
 *
 * @param value Any input value.
 * @returns Boolean value representing whether or not a function is an ISO date string.
 */
export const isIsoDateString = (value: any): boolean => value && typeof value === 'string' && isoDateFormat.test(value);

/**
 *
 * Function which takes a JavaScript object and evaluates
 *
 * @param body Response body from requests
 * @returns A body with all dates parsed as JavaScript date objects.
 */
export const handleDates = (body: Record<any, any>) => {
  if (body === null || body === undefined || typeof body !== 'object') return body;

  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(body)) {
    const value = body[key];
    // eslint-disable-next-line no-param-reassign
    if (isIsoDateString(value)) body[key] = parseISO(value);
    // eslint-disable-next-line
    else if (typeof value === 'object') handleDates(value);
  }

  return body;
};

/**
 * Abstract base class to be implemented by all API methods.
 *
 * Hides the implementation details of the underlying library.
 */
abstract class BaseAPI {
  private host: string;

  constructor() {
    this.host = 'http://localhost:8000/api';
  }
}

export default BaseAPI;
