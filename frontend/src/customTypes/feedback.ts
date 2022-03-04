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
  modified: Date;
  admin: IUser;
}

export interface IFeedback {
  id: number;
  type: FeedbackType;
  title: string;
  content: string;
  created: Date;
  modified: Date;
  reply: null | IFeedbackReply;
}
