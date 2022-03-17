import { dashboardRoutes } from 'routes';
import { UserGroup } from 'customTypes/auth';
import { renderHook } from '@testing-library/react-hooks';
import { useUser } from 'hooks/useUser';
import { FC } from 'react';
import { QueryRouterWrapper } from 'libs/testing';
import { useQuery } from 'react-query';
import { IMatchStatus } from 'customTypes/matching';
import useUserDashboardRoutes from './useUserDashboardRoutes';
import { useMyMentoringPairs } from './useMyMentoringPairs';

jest.mock('react-query', () => ({
  useQuery: jest.fn(() => ({})),
  useMutation: jest.fn(),
}));
jest.mock('hooks/useUser');
jest.mock('hooks/useMyMentoringPairs');

const wrapper: FC = ({ children }) => (
  <QueryRouterWrapper>{children}</QueryRouterWrapper>
);

describe('useUserDashboardRoutes', () => {
  beforeEach(() => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: {},
      isLoading: true,
    }));

    (useMyMentoringPairs as jest.Mock).mockImplementation(() => ({
      data: [{}],
    }));
  });

  it('hides all dashboard pages if user is not available', () => {
    (useUser as jest.Mock).mockImplementation(() => ({}));

    const { result } = renderHook(() => useUserDashboardRoutes(), { wrapper });

    expect(result.current).toEqual([]);
  });

  it('only shows dashboard pages accessible by a mentee if user is a mentee', () => {
    const menteeRoutes = dashboardRoutes
      .filter((route) => route.allowedGroups.includes(UserGroup.MENTEE))
      .filter((route) => route.name !== 'mentor_recommendations');

    (useUser as jest.Mock).mockImplementation(() => ({
      user: {
        groups: [{ name: UserGroup.MENTEE }],
        profile: {
          completed: true,
        },
      },
      isMentee: true,
      isMentor: false,
    }));

    (useMyMentoringPairs as jest.Mock).mockImplementation(() => ({
      data: [{
        status: IMatchStatus.ACCEPTED,
      }],
    }));

    const { result } = renderHook(() => useUserDashboardRoutes(), { wrapper });

    expect(result.current).toEqual(menteeRoutes);
  });

  it('only shows dashboard pages accessible by a mentor if user is a mentor', () => {
    const mentorRoutes = dashboardRoutes
      .filter((route) => route.allowedGroups.includes(UserGroup.MENTOR), { wrapper });

    (useUser as jest.Mock).mockImplementation(() => ({
      user: {
        groups: [{ name: UserGroup.MENTOR }],
        profile: {
          completed: true,
        },
      },
      isMentee: false,
      isMentor: true,
    }));

    const { result } = renderHook(() => useUserDashboardRoutes());

    expect(result.current).toEqual(mentorRoutes);
  });
});
