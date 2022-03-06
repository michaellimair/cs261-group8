import { render } from '@testing-library/react';
import CreateFeedbackButton from './CreateFeedbackButton';

describe('components/Feedback/CreateFeedbackButton', () => {
  it('renders correctly', () => {
    const result = render(<CreateFeedbackButton isLoading />);

    expect(result).toMatchSnapshot();
  });
});
