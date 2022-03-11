import CreateMilestone from 'components/PlanOfAction/shared-components/CreateMilestone';
import { FC } from 'react';
import MenteeMilestone from 'components/PlanOfAction/mentee-milestone/MenteeMilestone';

const MenteeMilestonePage: FC = () => (
  <>
    <CreateMilestone />
    <MenteeMilestone />
    <MenteeMilestone />
  </>
);

export default MenteeMilestonePage;
