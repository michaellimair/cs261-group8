/* eslint-disable max-classes-per-file */
import FeedbackFactory from 'factories/FeedbackFactory';
import { IFeedback } from 'customTypes/feedback';
import FeedbackAPI from './feedback.api';
import BaseAPI from './base.api';

class StubBaseAPI extends BaseAPI {
  public get = jest.fn();

  public post = jest.fn();

  public patch = jest.fn();
}

describe('feedback.api.ts', () => {
  let feedbackApi: FeedbackAPI;
  let api: BaseAPI;
  let feedback: IFeedback;

  beforeEach(() => {
    api = new StubBaseAPI();
    feedbackApi = new FeedbackAPI(api);
    feedback = (new FeedbackFactory()).create();
  });

  it('instantiates successfully', () => {
    expect(() => new FeedbackAPI(api)).not.toThrow();
  });

  describe('createFeedback', () => {
    it('can create feedback successfully', async () => {
      await feedbackApi.createFeedback(feedback);

      expect(api.post).toHaveBeenCalledTimes(1);
      expect(api.post).toHaveBeenCalledWith({
        path: '/feedbacks',
        body: feedback,
      });
    });
  });

  describe('updateFeedback', () => {
    it('can create feedback successfully', async () => {
      const updatePayload: Partial<IFeedback> = {
        content: 'update',
      };
      await feedbackApi.updateFeedback(feedback.id, updatePayload);

      expect(api.patch).toHaveBeenCalledTimes(1);
      expect(api.patch).toHaveBeenCalledWith({
        path: `/feedbacks/${feedback.id}`,
        body: updatePayload,
      });
    });
  });
});