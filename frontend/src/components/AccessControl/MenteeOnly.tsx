import { UserGroup } from 'customTypes/auth';
import { FC } from 'react';
import AccessControl from './AccessControl';

const MenteeOnly: FC = ({ children }) => (
  <AccessControl allowedGroups={[UserGroup.MENTEE]}>
    {children}
  </AccessControl>
);

export default MenteeOnly;
