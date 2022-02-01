import { parseISO } from 'date-fns';
import urljoin from 'url-join';
import axios, { AxiosInstance } from 'axios';
import ApiError from './error/ApiError';
import ValidationApiError from './error/BadRequestApiError';
import TooLargeError from './error/TooLargeError';
import UnprocessableEntityApiError from './error/UnprocessableEntityApiError';
import UnauthorizedError from './error/UnauthorizedError';

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
export const handleDates = (body: any) => {
  if (body === null || body === undefined || typeof body !== 'object') return body;

  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(body)) {
    const value = body[key];

    if (isIsoDateString(value)) {
      // eslint-disable-next-line no-param-reassign
      body[key] = parseISO(value);
    } else if (typeof value === 'object') {
      handleDates(value);
    }
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

  private client: AxiosInstance;

  protected basePath: string;

  constructor() {
    this.host = 'http://localhost:8000/api';
    this.basePath = '';

    this.client = axios.create({
      baseURL: this.host,
    });

    console.log(this.client);

    this.client.interceptors.response.use((resp) => {
      handleDates(resp.data);
      return resp;
    });

    this.client.interceptors.response.use(
      (resp) => resp,
      (err) => {
        // eslint-disable-next-line no-console
        console.error(err);
        if (err && axios.isAxiosError(err)) {
          if (err.response?.status === 400 && Array.isArray(err.response.data.message)) {
            return Promise.reject(new ValidationApiError(err.response.data.message));
          }
          if (err.response?.status === 401) {
            return Promise.reject(new UnauthorizedError(err.response.data.message));
          }
          if (err.response?.status === 413) {
            return Promise.reject(new TooLargeError(err.response.data?.message));
          }
          if (err.response?.status === 422) {
            return Promise.reject(new UnprocessableEntityApiError(err.response.data?.message));
          }
        }
        return Promise.reject(new ApiError('An error has occurred in the server.'));
      },
    );
  }

  protected getFullPath(path: string) {
    return urljoin(this.basePath, path);
  }

  async get<T = Record<string, unknown>, Qs = Record<string, unknown>>({
    path,
    query,
  }: {
    path: string;
    query?: Qs;
  }) {
    const fullPath = this.getFullPath(path);
    const resp = await this.client.get<T>(fullPath, {
      params: query,
    });
    return resp.data;
  }

  async post<
    Res = Record<string, unknown>,
    TBody = Record<string, unknown>,
    Qs = Record<string, unknown>,
  >({
    path,
    body,
    query,
  }: {
    path: string;
    body?: TBody;
    query?: Qs;
  }) {
    const fullPath = this.getFullPath(path);
    const resp = await this.client.post<Res>(fullPath, body ?? {}, {
      params: query,
    });
    return resp.data;
  }

  async patch<
    Res = Record<string, unknown>,
    TBody = Record<string, unknown>,
    Qs = Record<string, unknown>,
  >({
    path,
    body,
    query,
  }: {
    path: string;
    body?: TBody;
    query?: Qs;
  }) {
    const fullPath = this.getFullPath(path);
    const resp = await this.client.patch<Res>(fullPath, body ?? {}, {
      params: query,
    });
    return resp.data;
  }

  async put<
    Res = Record<string, unknown>,
    TBody = Record<string, unknown>,
    Qs = Record<string, unknown>,
  >({
    path,
    body,
    query,
  }: {
    path: string;
    body?: TBody;
    query?: Qs;
  }) {
    const fullPath = this.getFullPath(path);
    const resp = await this.client.put<Res>(fullPath, body ?? {}, {
      params: query,
    });
    return resp.data;
  }

  async delete<T = Record<string, unknown>, Qs = Record<string, unknown>>({
    path,
    query,
  }: {
    path: string;
    query?: Qs;
  }) {
    const fullPath = this.getFullPath(path);
    const resp = await this.client.delete<T>(fullPath, {
      params: query,
    });
    return resp.data;
  }
}

export default BaseAPI;
