import { render } from '@testing-library/react';
import MenteeGroupPage from './mentee-groups';

describe('MenteeGroupPage', () => {
  it('renders correctly', () => {
    const result = render(<MenteeGroupPage />);

    expect(result).toMatchSnapshot();
  });
});
