import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IFeedback } from 'customTypes/feedback';
import LoadingComponent from 'components/LoadingComponent';
import FeedbackRow from './FeedbackRow';

interface IFeedbackListProps {
  isLoading: boolean;
  feedbacks?: IFeedback[];
}

const FeedbackList: FC<IFeedbackListProps> = ({
  feedbacks,
  isLoading,
}) => {
  const { t } = useTranslation();

  return (
    <LoadingComponent
      isLoading={isLoading}
      hasData={Boolean(!isLoading && feedbacks && feedbacks.length)}
      noDataText={t('dashboard.feedback.no_feedback')}
    >
      {feedbacks?.map((feedback) => (
        <FeedbackRow feedback={feedback} key={feedback.id} />
      ))}
    </LoadingComponent>
  );
};

export default FeedbackList;
