import { IEvent } from './event';

export interface IGroupSessionSuggestion {
  count: number;
  skill: string;
}

export enum GroupSessionType {
  WORKSHOP = 'workshop',
  TUTORING_SESSION = 'tutoring_session',
}

export interface IGroupSessionCreateDTO {
  max_attendees: number;
  event: IEvent;
  related_skills: string[];
  type: GroupSessionType;
}
