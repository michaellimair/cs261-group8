/* eslint-disable max-classes-per-file */
import FeedbackFactory from 'factories/FeedbackFactory';
import { IFeedback } from 'customTypes/feedback';
import { ApiFactory } from 'factories/ApiFactory';
import FeedbackAPI from './feedback.api';
import BaseAPI from './base.api';

describe('feedback.api.ts', () => {
  let feedbackApi: FeedbackAPI;
  let api: BaseAPI;
  let feedback: IFeedback;

  beforeEach(() => {
    const apiFactory = new ApiFactory();
    api = apiFactory.create();
    feedbackApi = new FeedbackAPI(api);
    feedback = (new FeedbackFactory()).create();
  });

  it('instantiates successfully', () => {
    expect(() => new FeedbackAPI(api)).not.toThrow();
  });

  describe('getFeedback', () => {
    it('can get feedback successfully', async () => {
      await feedbackApi.getFeedback(1);

      expect(api.get).toHaveBeenCalledTimes(1);
      expect(api.get).toHaveBeenCalledWith({
        path: '/feedbacks/1',
      });
    });
  });

  describe('listFeedback', () => {
    it('can list feedback successfully', async () => {
      await feedbackApi.listFeedback();

      expect(api.get).toHaveBeenCalledTimes(1);
      expect(api.get).toHaveBeenCalledWith({
        path: '/feedbacks',
      });
    });
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
