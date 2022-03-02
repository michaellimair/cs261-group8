import { dashboardRoutes, IDashboardRoute } from 'routes';
import useUser from 'hooks/useUser';

const useUserDashboardRoutes = (): IDashboardRoute[] => {
  const { user } = useUser();

  if (!user) {
    return [];
  }

  return dashboardRoutes
    .filter(({ allowedGroups }) => allowedGroups
      .some((groupName) => user.groups.find(({ name }) => name === groupName)));
};

export default useUserDashboardRoutes;
