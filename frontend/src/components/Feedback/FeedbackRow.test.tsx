import { render } from '@testing-library/react';
import { IFeedback } from 'customTypes/feedback';
import FeedbackFactory from 'factories/FeedbackFactory';
import FeedbackRow from './FeedbackRow';

describe('components/Feedback/FeedbackRow', () => {
  const feedbackFactory = new FeedbackFactory();
  let feedback: IFeedback;

  beforeEach(() => {
    feedback = feedbackFactory.create();
  });

  it('renders correctly', () => {
    const result = render(<FeedbackRow feedback={feedback} />);

    expect(result).toMatchSnapshot();
  });
});
