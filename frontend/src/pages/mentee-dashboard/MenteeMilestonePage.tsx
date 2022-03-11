import CreateMilestone from 'components/shared-components/CreateMilestone';
import { FC } from 'react';
import MenteeMilestone from 'components/mentee-milestone/MenteeMilestone';

const MenteeMilestonePage: FC = () => (
  <>
    <CreateMilestone />
    <MenteeMilestone />
    <MenteeMilestone />
  </>
);

export default MenteeMilestonePage;
