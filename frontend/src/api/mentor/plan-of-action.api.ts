import {
  IComment,
  ICommentCreateUpdateDTO,
  IMilestone,
  IPlanOfAction,
  IPlanOfActionMentorUpdateDTO,
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
    super('/mentor/plans-of-action');
  }

  listPlansOfActionByMentee = (mentee_id: number): Promise<IPlanOfAction[]> => this.api.get<
  IPlanOfAction[],
  { mentee_id: number }
  >({
    path: this.getPath(''),
    query: { mentee_id },
  });

  approvePlanOfAction = (id: number) => this.api.patch<
  IPlanOfAction,
  Partial<IPlanOfActionMentorUpdateDTO>
  >({
    path: this.getPath(`/${id}`),
    body: { approved: true },
  });

  getPlanOfActionById = (
    id: number,
  ) => this.api.get<IPlanOfAction>({
    path: this.getPath(`/${id}`),
  });

  getMilestonesByPlanOfAction = async (
    planOfActionId: number,
  ): Promise<IMilestone[]> => this.api.get<IMilestone[]>({
    path: this.getPath(`${planOfActionId}/milestones/`),
  });

  getCommentsByPlanOfAction = async (
    planOfActionId: number,
  ): Promise<IComment[]> => this.api.get<IComment[]>({
    path: this.getPath(`${planOfActionId}/comments/`),
  });

  addComment = async (
    planOfActionId: number,
    data: ICommentCreateUpdateDTO,
  ) => this.api.post<IComment[], ICommentCreateUpdateDTO>({
    path: this.getPath(`${planOfActionId}/comments/`),
    body: data,
  });
}

export default MenteePlanOfActionAPI;
