import { render } from '@testing-library/react';
import { IFeedback } from 'customTypes/feedback';
import FeedbackFactory from 'factories/FeedbackFactory';
import { QueryRouterWrapper } from 'libs/testing';
import FeedbackList from './FeedbackList';

describe('components/Feedback/FeedbackList', () => {
  const feedbackFactory = new FeedbackFactory();
  let feedbacks: IFeedback[];

  beforeEach(() => {
    feedbacks = feedbackFactory.createMany(10);
  });

  it('renders correctly', () => {
    const result = render(
      <QueryRouterWrapper>
        <FeedbackList feedbacks={feedbacks} isLoading={false} />
      </QueryRouterWrapper>,
    );

    expect(result).toMatchSnapshot();
  });
});
