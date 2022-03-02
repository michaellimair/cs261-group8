import { UserGroup } from 'customTypes/auth';
import { FC } from 'react';
import AccessControl from './AccessControl';

const MentorOnly: FC = ({ children }) => (
  <AccessControl allowedGroups={[UserGroup.MENTOR]}>
    {children}
  </AccessControl>
);

export default MentorOnly;
