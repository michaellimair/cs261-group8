import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IMilestone } from 'customTypes/plan-of-action';
import LoadingComponent from 'components/LoadingComponent';
import MilestoneRow from 'components/PlanOfAction/shared-components/MilestoneRow';

interface IMilestoneListProps {
  isLoading: boolean;
  milestones?: IMilestone[];
}

const MilestoneList: FC<IMilestoneListProps> = ({
  milestones,
  isLoading,
}) => {
  const { t } = useTranslation();

  return (
    <LoadingComponent
      isLoading={isLoading}
      hasData={Boolean(!isLoading && milestones && milestones.length)}
      noDataText={t('no_milestones')}
    >
      {milestones?.map((milestone) => (
        <MilestoneRow milestone={milestone} key={milestone.id} />
      ))}
    </LoadingComponent>
  );
};

export default MilestoneList;
