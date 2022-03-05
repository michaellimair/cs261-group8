import { render } from '@testing-library/react';
import { IFeedback } from 'customTypes/feedback';
import FeedbackFactory from 'factories/FeedbackFactory';
import { QueryRouterWrapper } from 'libs/testing';
import FeedbackRow from './FeedbackRow';

describe('components/Feedback/FeedbackRow', () => {
  const feedbackFactory = new FeedbackFactory();
  let feedback: IFeedback;

  beforeEach(() => {
    feedback = feedbackFactory.create();
  });

  it('renders correctly', () => {
    const result = render(
      <QueryRouterWrapper>
        <FeedbackRow feedback={feedback} />
      </QueryRouterWrapper>,
    );

    expect(result).toMatchSnapshot();
  });
});
