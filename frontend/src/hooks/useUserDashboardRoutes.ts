import { dashboardRoutes, IDashboardRoute } from 'routes';
import { useUser } from 'hooks/useUser';
import { checkAllowed } from 'libs/access-control';

const useUserDashboardRoutes = (): IDashboardRoute[] => {
  const { user } = useUser();

  if (!user) {
    return [];
  }

  return dashboardRoutes
    .filter(({ allowedGroups }) => checkAllowed({ allowedGroups, userGroups: user.groups }));
};

export default useUserDashboardRoutes;
