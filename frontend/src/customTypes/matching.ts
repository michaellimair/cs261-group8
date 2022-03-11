import { IUser } from './auth';

export enum IMatchStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export interface IMatch {
  mentor: IUser;
  mentee: IUser;
  status: IMatchStatus;
  id: number;
  mentor_id: number;
  mentee_id: number;
}

export interface IRespondMatchDTO {
  status: IMatchStatus.ACCEPTED | IMatchStatus.REJECTED;
}

export interface IInitiateMatchDTO {
  mentor_id: number;
}

export interface IMatchSuggestion {
  id: number;
  score: number;
  mentees_count: number;
  mentor: IUser;
}