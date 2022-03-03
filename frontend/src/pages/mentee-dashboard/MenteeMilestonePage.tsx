import CreateMilestone from 'components/shared-components/CreateMilestone';
import { FC } from 'react';
import MenteeMilestoneEdit from 'components/mentee-milestone/MenteeMilestoneEdit';

const MenteeMilestonePage: FC = () => (
  <>
    <CreateMilestone />
    <MenteeMilestoneEdit />
    <MenteeMilestoneEdit />
  </>
);

export default MenteeMilestonePage;
