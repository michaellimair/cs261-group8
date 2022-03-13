import { PlanOfActionType } from 'customTypes/plan-of-action';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const usePlanTypeOptions = () => {
  const { t } = useTranslation();

  return useMemo(() => [
    {
      label: t('plan_professional'),
      value: PlanOfActionType.PROFESSIONAL,
    },
    {
      label: t('plan_personal'),
      value: PlanOfActionType.PERSONAL,
    },
  ], [t]);
};

export default usePlanTypeOptions;
