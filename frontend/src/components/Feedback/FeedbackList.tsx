import { FC } from 'react';
import { Spinner } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { IFeedback } from 'customTypes/feedback';
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

  if (isLoading) {
    return <Spinner />;
  }

  if (!feedbacks || !feedbacks.length) {
    return <div>{t('description.feedback.no_feedback')}</div>;
  }

  return (
    <div>
      {feedbacks.map((feedback) => (
        <FeedbackRow feedback={feedback} key={feedback.id} />
      ))}
    </div>
  );
};

export default FeedbackList;
