import { IFeedback } from 'customTypes/feedback';
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
    feedback: IFeedback,
  ): Promise<IFeedback> => this.api.post<IFeedback, IFeedback>({
    path: this.getPath(''),
    body: feedback,
  });

  listFeedback = (): Promise<IFeedback[]> => this.api.get<IFeedback[]>({
    path: this.getPath(''),
  });

  updateFeedback = (
    id: number,
    feedback: Partial<Omit<IFeedback, 'reply'>>,
  ): Promise<IFeedback> => this.api.patch<IFeedback, Partial<Omit<IFeedback, 'reply'>>>({
    path: this.getPath(`/${id}`),
    body: feedback,
  });
}

export default FeedbackAPI;
