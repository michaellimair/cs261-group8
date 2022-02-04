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
