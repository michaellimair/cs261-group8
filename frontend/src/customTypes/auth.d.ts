import { IApiBadRequestErrorData } from './api';

export interface IUser {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface IRegistration {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  verify_password: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginResult {
  user: Pick<IUser, 'username'>;
  token: string;
  expiry: Date;
}

/**
 * Login error type to use if the error is a Bad Request error,
 * possibly due to the wrong username or password.
 */
export type ILoginError = IApiBadRequestErrorData<ILogin>;
