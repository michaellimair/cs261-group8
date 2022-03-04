import { render } from '@testing-library/react';
import EditFeedbackButton from './EditFeedbackButton';

describe('components/Feedback/EditFeedbackButton', () => {
  it('renders correctly', () => {
    const result = render(<EditFeedbackButton isLoading />);

    expect(result).toMatchSnapshot();
  });
});
