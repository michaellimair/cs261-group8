import { render } from '@testing-library/react';
import { IFeedbackReply } from 'customTypes/feedback';
import FeedbackReplyFactory from 'factories/FeedbackReplyFactory';
import { QueryRouterWrapper } from 'libs/testing';
import ViewFeedbackReply from './ViewFeedbackReply';

describe('components/Feedback/ViewFeedbackReply', () => {
  const feedbackReplyFactory = new FeedbackReplyFactory();
  let reply: IFeedbackReply;

  beforeEach(() => {
    reply = feedbackReplyFactory.create();
  });

  it('renders correctly', () => {
    const result = render(
      <QueryRouterWrapper>
        <ViewFeedbackReply reply={reply} />
      </QueryRouterWrapper>,
    );

    expect(result).toMatchSnapshot();
  });
});
