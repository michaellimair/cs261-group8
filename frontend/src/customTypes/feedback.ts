import { IUser } from './auth';

export enum FeedbackType {
  BUG = 'bug',
  IMPROVEMENT = 'improvement',
  QUESTION = 'question',
}

export interface IFeedbackReply {
  id: number;
  content: string;
  created: Date;
  updated: Date;
  admin: IUser;
}

export interface IFeedback {
  id: number;
  type: FeedbackType;
  content: string;
  created: Date;
  updated: Date;
  reply: null | IFeedbackReply;
}
