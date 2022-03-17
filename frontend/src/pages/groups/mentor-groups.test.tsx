import { render } from '@testing-library/react';
import { useUser } from 'hooks';
import { useQuery } from 'react-query';
import MentorGroupPage from './mentor-groups';

jest.mock('hooks/useUser');
jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}));

describe('MenteeGroupPage', () => {
  it('renders correctly', () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      isFetching: true,
      data: null,
      refetch: jest.fn(),
    }));
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
