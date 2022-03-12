import { IUserGroup, UserGroup } from 'customTypes/auth';
import { checkAllowed } from './access-control';

describe('libs/access-control', () => {
  describe('checkAllowed', () => {
    it('allows users who is part of allowed groups to access a resouce', () => {
      const userGroups: IUserGroup[] = [
        {
          id: 1,
          name: UserGroup.MENTEE,
        },
      ];

      const allowedGroups: UserGroup[] = [UserGroup.MENTEE];

      expect(checkAllowed({ userGroups, allowedGroups })).toBe(true);
    });

    it('blocks users who is not part of allowed groups from accessing a resouce', () => {
      const userGroups: IUserGroup[] = [
        {
          id: 1,
          name: UserGroup.MENTEE,
        },
      ];

      const allowedGroups: UserGroup[] = [UserGroup.MENTOR];

      expect(checkAllowed({ userGroups, allowedGroups })).toBe(false);
    });
  });
});
