import { IEvent, IEventCreateDTO } from './event';
import { IPlanOfAction } from './plan-of-action';

export enum IMeetingStatus {
  REQUESTED = 'requested',
  ALTERNATIVE_PROPOSED = 'alternative_proposed',
  ACCEPTED = 'accepted',
}

export interface IMeetingCreateDTO {
  event: IEventCreateDTO;
  plan_of_action_ids?: number[]
}

export interface IMeetingRecord {
  description: string;
  attachments: File[];
  approved: boolean;
}

export interface IMeetingRecordCreate extends Omit<IMeetingRecord, 'approved'> {}

export interface IMeeting {
  event: IEvent;
  plans_of_action: IPlanOfAction[],
  status: IMeetingStatus;
  record: null | IMeetingRecord;
}
