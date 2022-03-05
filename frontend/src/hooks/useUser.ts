import { useContext, useMemo } from 'react';
import UserContext from 'context/UserContext';
import { IUser, UserGroup } from 'customTypes/auth';

interface IUseUser {
  isLoading: boolean;
  isUnauthorized: boolean;
  user?: IUser;
  isLoggedIn: boolean;
  isMentor: boolean;
  isMentee: boolean;
  reauthenticate: () => Promise<void>;
}

interface IUseUserProps {
  /** Injectable context used for testing purposes */
  context?: typeof UserContext;
}

export const useUser = ({
  context = UserContext,
}: IUseUserProps = {}): IUseUser => {
  const userContext = useContext(context);
  const {
    user, refetch, isLoading, isUnauthorized,
  } = userContext;

  const isLoggedIn = useMemo(() => !isLoading && Boolean(user), [user, isLoading]);

  const isMentor = useMemo(
    () => (user ? user.groups.some((group) => group.name === UserGroup.MENTOR) : false),
    [user],
  );

  const isMentee = useMemo(
    () => (user ? user.groups.some((group) => group.name === UserGroup.MENTEE) : false),
    [user],
  );

  return {
    isLoading,
    isUnauthorized,
    user,
    isLoggedIn,
    reauthenticate: refetch,
    isMentor,
    isMentee,
  };
};
