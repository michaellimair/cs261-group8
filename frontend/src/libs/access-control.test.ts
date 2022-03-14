import { IUserGroup, UserGroup } from 'customTypes/auth';
import { checkAllowed } from './access-control';

const userGroups: IUserGroup[] = [
  {
    id: 1,
    name: UserGroup.MENTEE,
  },
];

describe('libs/access-control', () => {
  describe('checkAllowed', () => {
    it('allows users not part of any group to access undeclared only routes', () => {
      expect(checkAllowed({ userGroups: [], allowedGroups: [UserGroup.UNDECLARED] })).toBe(true);
    });

    it('disallows users that is of a group to access undeclared only routes', () => {
      expect(checkAllowed({ userGroups, allowedGroups: [UserGroup.UNDECLARED] })).toBe(false);
    });

    it('allows users who is part of allowed groups to access a resouce', () => {
      const allowedGroups: UserGroup[] = [UserGroup.MENTEE];

      expect(checkAllowed({ userGroups, allowedGroups })).toBe(true);
    });

    it('blocks users who is not part of allowed groups from accessing a resouce', () => {
      const allowedGroups: UserGroup[] = [UserGroup.MENTOR];

      expect(checkAllowed({ userGroups, allowedGroups })).toBe(false);
    });
  });
});
