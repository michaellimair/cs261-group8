import { IFeedback, IFeedbackDTO } from 'customTypes/feedback';
import BaseAPI from './base.api';
import CommonAPI from './common.api';

/**
 * API class which wraps all authentication methods.
 */
class FeedbackAPI extends CommonAPI {
  constructor(
    private readonly api: BaseAPI,
  ) {
    super('/feedbacks');
  }

  createFeedback = (
    feedback: IFeedbackDTO,
  ): Promise<IFeedback> => this.api.post<IFeedback, IFeedbackDTO>({
    path: this.getPath(''),
    body: feedback,
  });

  listFeedback = (): Promise<IFeedback[]> => this.api.get<IFeedback[]>({
    path: this.getPath(''),
  });

  getFeedback = (id: number): Promise<IFeedback> => this.api.get<IFeedback>({
    path: this.getPath(`/${id}`),
  });

  updateFeedback = (
    id: number,
    feedback: Partial<IFeedbackDTO>,
  ): Promise<IFeedback> => this.api.patch<IFeedback, Partial<IFeedbackDTO>>({
    path: this.getPath(`/${id}`),
    body: feedback,
  });
}

export default FeedbackAPI;
