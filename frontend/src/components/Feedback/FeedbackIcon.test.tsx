import { render } from '@testing-library/react';
import { FeedbackType } from 'customTypes/feedback';
import FeedbackIcon from './FeedbackIcon';

describe('components/Feedback/FeedbackIcon', () => {
  it('renders bug icon when feedback type is a bug', () => {
    const result = render(<FeedbackIcon type={FeedbackType.BUG} />);

    expect(result).toMatchSnapshot();
  });

  it('renders idea icon when feedback type is improvement', () => {
    const result = render(<FeedbackIcon type={FeedbackType.IMPROVEMENT} />);

    expect(result).toMatchSnapshot();
  });

  it('falls back to rendering question icon for other question types', () => {
    const result = render(<FeedbackIcon type={FeedbackType.QUESTION} />);

    expect(result).toMatchSnapshot();
  });
});
