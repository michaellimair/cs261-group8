import {
  dashboardRoutes, IDashboardRoute, isMenteeDashboardRoute, welcomeRoutes,
} from 'routes';
import { useUser } from 'hooks/useUser';
import { checkAllowed } from 'libs/access-control';
import { UserGroup } from 'customTypes/auth';
import { IMatchStatus } from 'customTypes/matching';
import { useMyMentoringPairs } from './useMyMentoringPairs';

const matchRequirementHierarchy = [
  IMatchStatus.REJECTED,
  null,
  IMatchStatus.PENDING,
  IMatchStatus.ACCEPTED,
];

const checkMatchRequirement = (
  currentStatus: IMatchStatus | null,
  requirement: IMatchStatus | null,
) => matchRequirementHierarchy.indexOf(
  currentStatus,
) >= matchRequirementHierarchy.indexOf(requirement);

const useUserDashboardRoutes = (shouldHide?: boolean): IDashboardRoute[] => {
  const { user, isMentee } = useUser();
  const { data: menteePairs } = useMyMentoringPairs(UserGroup.MENTEE);

  if (!user) {
    return [];
  }

  if (!user.profile.completed) {
    return welcomeRoutes;
  }

  let routes = dashboardRoutes
    .filter(({ hide }) => !(shouldHide && hide))
    .filter(({ allowedGroups }) => checkAllowed({ allowedGroups, userGroups: user.groups }));

  if (isMentee) {
    const maxStatus = matchRequirementHierarchy[
      Math.max(
        ...(menteePairs?.map((it) => matchRequirementHierarchy.indexOf(it.status)) ?? []),
        matchRequirementHierarchy.indexOf(null),
      )
    ];
    // Special case for recommendation page, only show if a mentee is pending acceptance from mentor
    if (
      matchRequirementHierarchy.indexOf(maxStatus)
      >= matchRequirementHierarchy.indexOf(IMatchStatus.PENDING)) {
      routes = routes.filter((it) => it.name !== 'mentor_recommendations');
    }
    routes = routes.filter((it) => {
      if (isMenteeDashboardRoute(it)) {
        return checkMatchRequirement(maxStatus, it.requiredMatchStatus);
      }
      return true;
    });
  }

  return routes;
};

export default useUserDashboardRoutes;
