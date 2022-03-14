import { render } from '@testing-library/react';
import { useUser } from 'hooks';
import MentorGroupPage from './mentor-groups';

jest.mock('hooks/useUser');

describe('MenteeGroupPage', () => {
  it('renders correctly', () => {
    (useUser as jest.Mock).mockImplementation(() => ({
      user: {
        id: 1,
        profile: {
          timezone: 'Asia/Jakarta',
        },
      },
    }));
    const result = render(<MentorGroupPage />);

    expect(result).toMatchSnapshot();
  });
});