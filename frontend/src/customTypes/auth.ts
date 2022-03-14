import { IApiBadRequestErrorData } from './api';
import { ILanguage } from './language';

export enum JobTitle {
  ANALYST = 'anlst',
  ASSOCIATE = 'assoc',
  ASSISTANT_VICE_PRESIDENT = 'avp',
  VICE_PRESIDENT = 'vp',
  DIRECTOR = 'dir',
  MANAGING_DIRECTOR = 'md',
}

export interface IBusinessArea {
  id: number;
  name: string;
  label: string;
}

export interface IUserProfile {
  completed: boolean;
  pronoun: string | null;
  years_experience: number | null;
  title: JobTitle | null;
  business_area: IBusinessArea | null;
  country: string | null;
  timezone: string | null;
  skills: string[] | null;
  avatar: string | null;
  languages: ILanguage[];
}

export interface IUserProfileDTO extends Omit<IUserProfile, 'business_area' | 'avatar'> {
  business_area_id: number;
  avatar: File;
  groups: number[]
}

export enum UserGroup {
  MENTOR = 'mentor',
  MENTEE = 'mentee',
  UNDECLARED = 'undeclared',
}

export interface IUserGroup {
  id: number;
  name: UserGroup;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  profile: IUserProfile;
  groups: IUserGroup[];
}

export interface IUserUpdateDTO extends Pick<Partial<IUser>, 'first_name' | 'last_name' | 'groups'> {
  password?: string;
  verify_password?: string;
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
export type ILoginError = IApiBadRequestErrorData<Partial<ILogin>>;

export type IRegistrationError = IApiBadRequestErrorData<Partial<IRegistration>>;

export type IWelcomeError = IApiBadRequestErrorData<Partial<IUserProfileDTO>>;
