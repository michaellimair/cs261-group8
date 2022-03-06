import { FeedbackType } from 'customTypes/feedback';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const useFeedbackTypeOptions = () => {
  const { t } = useTranslation();

  return useMemo(() => [
    {
      label: t('dashboard.feedback.bug'),
      value: FeedbackType.BUG,
    },
    {
      label: t('dashboard.feedback.improvement'),
      value: FeedbackType.IMPROVEMENT,
    },
    {
      label: t('dashboard.feedback.question'),
      value: FeedbackType.QUESTION,
    },
  ], [t]);
};

export default useFeedbackTypeOptions;
