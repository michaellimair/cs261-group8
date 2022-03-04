import { IFeedback, IFeedbackDTO } from 'customTypes/feedback';
import urljoin from 'url-join';
import BaseAPI from './base.api';

/**
 * API class which wraps all authentication methods.
 */
class FeedbackAPI {
  private basePath: string;

  constructor(
    private readonly api: BaseAPI,
  ) {
    this.basePath = '/feedbacks';
  }

  private getPath = (path: string) => urljoin(this.basePath, path);

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
