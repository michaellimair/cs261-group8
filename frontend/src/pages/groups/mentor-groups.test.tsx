import { render } from '@testing-library/react';
import MentorGroupPage from './mentor-groups';

describe('MenteeGroupPage', () => {
  it('renders correctly', () => {
    const result = render(<MentorGroupPage />);

    expect(result).toMatchSnapshot();
  });
});
