import { IUserGroup, UserGroup } from 'customTypes/auth';

/** Function to check whether a user is allowed to access a certain resource
 * given the list of groups which can access the resource. */
export const checkAllowed = ({
  userGroups,
  allowedGroups,
}: {
  userGroups: IUserGroup[];
  allowedGroups: UserGroup[];
}) => allowedGroups
  .some((groupName) => userGroups.find(({ name }) => name === groupName));
