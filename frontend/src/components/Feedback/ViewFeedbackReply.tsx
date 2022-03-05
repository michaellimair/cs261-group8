import { Text } from '@chakra-ui/react';
import { IFeedbackReply } from 'customTypes/feedback';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface IViewFeedbackReplyProps {
  reply?: IFeedbackReply | null;
}

const ViewFeedbackReply: FC<IViewFeedbackReplyProps> = ({
  reply,
}) => {
  const { t } = useTranslation();

  if (!reply) {
    return (
      <>
        <Text fontWeight="semibold" fontSize="lg">{t('dashboard.feedback.admin_reply')}</Text>
        <Text fontSize="xs">-</Text>
      </>
    );
  }

  const { modified, content } = reply;

  return (
    <>
      <Text fontWeight="semibold" fontSize="lg">{t('dashboard.feedback.admin_reply')}</Text>
      {reply && (
        <>
          <Text fontSize={{ base: 'md' }} whiteSpace="pre-wrap">
            {content}
          </Text>
          <Text fontSize={{ base: 'xs' }}>
            {t('dashboard.feedback.replied_on', { replied: modified })}
          </Text>
        </>
      )}
    </>
  );
};

export default ViewFeedbackReply;
