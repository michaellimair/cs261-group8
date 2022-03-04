import { render } from '@testing-library/react';
import { FeedbackType } from 'customTypes/feedback';
import { FcHighPriority, FcIdea } from 'react-icons/fc';
import { GrCircleQuestion } from 'react-icons/gr';
import FeedbackIcon from './FeedbackIcon';

describe('components/Feedback/FeedbackIcon', () => {
  it('renders bug icon when feedback type is a bug', () => {
    const result = render(<FeedbackIcon type={FeedbackType.BUG} />);
    const expected = render(<FcHighPriority />);

    expect(result.container.innerHTML).toEqual(expected.container.innerHTML);
  });

  it('renders idea icon when feedback type is improvement', () => {
    const result = render(<FeedbackIcon type={FeedbackType.IMPROVEMENT} />);
    const expected = render(<FcIdea />);

    expect(result.container.innerHTML).toEqual(expected.container.innerHTML);
  });

  it('falls back to rendering question icon for other question types', () => {
    const result = render(<FeedbackIcon type={FeedbackType.QUESTION} />);
    const expected = render(<GrCircleQuestion />);

    expect(result.container.innerHTML).toEqual(expected.container.innerHTML);
  });
});
