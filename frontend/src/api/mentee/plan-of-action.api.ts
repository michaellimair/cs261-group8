import {
  IComment,
  IMilestone,
  IMilestoneCreateUpdateDTO,
  IPlanOfAction,
  IPlanOfActionCreateDTO,
  IPlanOfActionMenteeUpdateDTO,
} from 'customTypes/plan-of-action';
import BaseAPI from '../base.api';
import CommonAPI from '../common.api';

/**
 * API class which wraps all authentication methods.
 */
class MenteePlanOfActionAPI extends CommonAPI {
  constructor(
    private readonly api: BaseAPI,
  ) {
    super('/mentee/plans-of-action');
  }

  listPlansOfAction = (): Promise<IPlanOfAction[]> => this.api.get<IPlanOfAction[]>({
    path: this.getPath(''),
  });

  createPlanOfAction = (planOfAction: IPlanOfActionCreateDTO) => this.api.post<
  IPlanOfAction,
  IPlanOfActionCreateDTO
  >({
    path: this.getPath(''),
    body: planOfAction,
  });

  getPlanOfActionById = (
    id: number,
  ) => this.api.get<IPlanOfAction>({
    path: this.getPath(`/${id}`),
  });

  updatePlanOfAction = (
    id: number,
    planOfAction: Partial<IPlanOfActionMenteeUpdateDTO>,
  ) => this.api.patch<
  IPlanOfAction,
  Partial<IPlanOfActionMenteeUpdateDTO>
  >({
    path: this.getPath(`/${id}`),
    body: planOfAction,
  });

  deletePlanOfAction = async (
    id: number,
  ): Promise<void> => {
    await this.api.delete({
      path: this.getPath(`/${id}`),
    });
  };

  getMilestonesByPlanOfAction = (
    planOfActionId: number,
  ) => this.api.get<IMilestone>({
    path: this.getPath(`${planOfActionId}/milestones`),
  });

  createMilestone = (
    planOfActionId: number,
    data: IMilestoneCreateUpdateDTO,
  ) => this.api.post<
  IMilestone,
  IMilestoneCreateUpdateDTO
  >({
    path: this.getPath(`${planOfActionId}/milestones`),
    body: data,
  });

  updateMilestone = (
    planOfActionId: number,
    milestoneId: number,
    data: Partial<IMilestoneCreateUpdateDTO>,
  ) => this.api.post<
  IMilestone,
  Partial<IMilestoneCreateUpdateDTO>
  >({
    path: this.getPath(`${planOfActionId}/milestones/${milestoneId}`),
    body: data,
  });

  getMilestoneById = async (
    planOfActionId: number,
    milestoneId: number,
  ): Promise<void> => {
    await this.api.get({
      path: this.getPath(`${planOfActionId}/milestones/${milestoneId}`),
    });
  };

  deleteMilestone = async (
    planOfActionId: number,
    milestoneId: number,
  ): Promise<void> => {
    await this.api.delete({
      path: this.getPath(`${planOfActionId}/milestones/${milestoneId}`),
    });
  };

  getCommentsByPlanOfAction = (
    planOfActionId: number,
  ): Promise<IComment[]> => this.api.get<IComment[]>({
    path: this.getPath(`${planOfActionId}/comments`),
  });
}

export default MenteePlanOfActionAPI;
