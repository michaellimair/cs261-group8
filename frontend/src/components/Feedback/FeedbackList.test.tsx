import { Spinner } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { IFeedback } from 'customTypes/feedback';
import FeedbackFactory from 'factories/FeedbackFactory';
import FeedbackList from './FeedbackList';

describe('components/Feedback/FeedbackList', () => {
  const feedbackFactory = new FeedbackFactory();
  let feedbacks: IFeedback[];

  beforeEach(() => {
    feedbacks = feedbackFactory.createMany(10);
  });

  it('renders loading spinner if not loaded', () => {
    const result = render(<FeedbackList isLoading />);
    const expected = render(<Spinner />);

    expect(result.container.innerHTML).toMatchSnapshot(expected.container.innerHTML);
  });

  it('displays no feedback text if there is no feedback', () => {
    const result = render(<FeedbackList isLoading={false} feedbacks={[]} />);

    expect(result.container.innerHTML).toBe('<div>description.feedback.no_feedback</div>');
  });

  it('renders correctly', () => {
    const result = render(<FeedbackList feedbacks={feedbacks} isLoading={false} />);

    expect(result).toMatchSnapshot();
  });
});
