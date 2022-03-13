export enum PlanOfActionType {
  PROFESSIONAL = 'professional',
  PERSONAL = 'personal',
}

export interface IComment {
  id: number;
  content: string;
  created: Date;
  modified: Date;
}

export interface ICommentCreateUpdateDTO extends Pick<IComment, 'content'> {}

export interface IMilestone {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created: Date;
  modified: Date;
}

export interface IMilestoneCreateUpdateDTO extends Pick<IMilestone, 'title' | 'description' | 'completed'> {}

export interface IPlanOfAction {
  id: number;
  title: string;
  description: string;
  type: PlanOfActionType;
  approved: boolean;
  created: Date;
  modified: Date;
  comments: IComment[];
  milestones: IMilestone[];
}

export interface IPlanOfActionCreateDTO extends Pick<IPlanOfAction, 'title' | 'description' | 'type'> {}

export interface IPlanOfActionMenteeUpdateDTO extends Pick<IPlanOfAction, 'title' | 'description' | 'type'> {}

export interface IPlanOfActionMentorUpdateDTO extends Pick<IPlanOfAction, 'approved'> {}
