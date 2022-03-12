import { IUser } from './auth';

export interface IMentor {
  user: IUser;
  vote: number;
}
