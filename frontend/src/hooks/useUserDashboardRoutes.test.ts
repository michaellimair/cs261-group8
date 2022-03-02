import { dashboardRoutes } from 'routes';
import { UserGroup } from 'customTypes/auth';
import { renderHook } from '@testing-library/react-hooks';
import { useUser } from 'hooks/useUser';
import useUserDashboardRoutes from './useUserDashboardRoutes';

jest.mock('hooks/useUser');

describe('useUserDashboardRoutes', () => {
  it('hides all dashboard pages if user is not available', () => {
    (useUser as jest.Mock).mockImplementationOnce(() => ({}));

    const { result } = renderHook(() => useUserDashboardRoutes());

    expect(result.current).toEqual([]);
  });

  it('only shows dashboard pages accessible by a mentor if user is a mentee', () => {
    const menteeRoutes = dashboardRoutes
      .filter((route) => route.allowedGroups.includes(UserGroup.MENTEE));

    (useUser as jest.Mock).mockImplementationOnce(() => ({
      user: {
        groups: [{ name: UserGroup.MENTEE }],
      },
    }));

    const { result } = renderHook(() => useUserDashboardRoutes());

    expect(result.current).toEqual(menteeRoutes);
  });

  it('only shows dashboard pages accessible by a mentor if user is a mentor', () => {
    const mentorRoutes = dashboardRoutes
      .filter((route) => route.allowedGroups.includes(UserGroup.MENTOR));

    (useUser as jest.Mock).mockImplementationOnce(() => ({
      user: {
        groups: [{ name: UserGroup.MENTOR }],
      },
    }));

    const { result } = renderHook(() => useUserDashboardRoutes());

    expect(result.current).toEqual(mentorRoutes);
  });
});
