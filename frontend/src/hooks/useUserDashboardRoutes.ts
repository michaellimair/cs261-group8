import {
  dashboardRoutes, IDashboardRoute, isMenteeDashboardRoute, welcomeRoutes,
} from 'routes';
import { useUser } from 'hooks/useUser';
import { checkAllowed } from 'libs/access-control';
import { UserGroup } from 'customTypes/auth';
import { IMatchStatus } from 'customTypes/matching';
import useMyMentoringPairs from './useMyMentoringPairs';

const useUserDashboardRoutes = (shouldHide?: boolean): IDashboardRoute[] => {
  const { user, isMentee } = useUser();
  const { data: menteePairs } = useMyMentoringPairs(UserGroup.MENTEE);

  if (!user) {
    return [];
  }

  if (!user.profile.completed) {
    return welcomeRoutes
      .filter(({ allowedGroups }) => checkAllowed({ allowedGroups, userGroups: user.groups }));
  }

  let routes = dashboardRoutes
    .filter(({ hide }) => !(shouldHide && hide))
    .filter(({ allowedGroups }) => checkAllowed({ allowedGroups, userGroups: user.groups }));

  if (isMentee && !menteePairs?.filter((it) => it.status === IMatchStatus.ACCEPTED)?.length) {
    routes = routes.filter((it) => {
      if (isMenteeDashboardRoute(it)) {
        return !it.requiresMentor;
      }
      return true;
    });
  }

  return routes;
};

export default useUserDashboardRoutes;
