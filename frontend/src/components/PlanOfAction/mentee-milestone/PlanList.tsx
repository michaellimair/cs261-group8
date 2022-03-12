import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IPlanOfAction } from 'customTypes/plan-of-action';
import LoadingComponent from 'components/LoadingComponent';
import PlanRow from '../shared-components/PlanRow';

interface IPlanListProps {
  isLoading: boolean;
  plans?: IPlanOfAction[];
}

const PlanList: FC<IPlanListProps> = ({
  plans,
  isLoading,
}) => {
  const { t } = useTranslation();

  return (
    <LoadingComponent
      isLoading={isLoading}
      hasData={Boolean(!isLoading && plans && plans.length)}
      noDataText={t('no_plans')}
    >
      {plans?.map((plan) => (
        <PlanRow plan={plan} key={plan.id} />
      ))}
    </LoadingComponent>
  );
};

export default PlanList;
