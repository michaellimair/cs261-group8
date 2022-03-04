import { dashboardRoutes, IDashboardRoute } from 'routes';
import { useUser } from 'hooks/useUser';
import { checkAllowed } from 'libs/access-control';

const useUserDashboardRoutes = (shouldHide?: boolean): IDashboardRoute[] => {
  const { user } = useUser();

  if (!user) {
    return [];
  }

  return dashboardRoutes
    .filter(({ hide }) => !(shouldHide && hide))
    .map((route) => {
      const children = route.children?.filter(({ hide }) => !(shouldHide && hide));
      return {
        ...route,
        children,
      };
    })
    .filter(({ allowedGroups }) => checkAllowed({ allowedGroups, userGroups: user.groups }));
};

export default useUserDashboardRoutes;
