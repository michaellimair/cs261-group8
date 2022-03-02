import { UserGroup } from 'customTypes/auth';
import { useUser } from 'hooks/useUser';
import { checkAllowed } from 'libs/access-control';
import {
  FC, useMemo,
} from 'react';

interface IAccessControlProps {
  allowedGroups: UserGroup[];
}

const AccessControl: FC<IAccessControlProps> = ({
  children, allowedGroups,
}) => {
  const { user } = useUser();

  const userGroups = useMemo(() => {
    if (!user) {
      return [];
    }

    return user.groups;
  }, [user]);

  const allowed = useMemo(
    () => checkAllowed({ userGroups, allowedGroups }),
    [userGroups, allowedGroups],
  );

  if (!allowed) {
    return null;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default AccessControl;
