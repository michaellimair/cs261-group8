import { IEvent, IEventCreateDTO } from './event';

export interface IGroupSessionSuggestion {
  count: number;
  skill: string;
}

export enum GroupSessionType {
  WORKSHOP = 'workshop',
  TUTORING_SESSION = 'tutoring_session',
}

export interface IGroupSession {
  max_attendees: number;
  event: IEvent;
  type: GroupSessionType;
  related_skills: string[];
}

export interface IGroupSessionCreateDTO {
  max_attendees: number;
  event: IEventCreateDTO;
  related_skills: string[];
  type: GroupSessionType;
}
