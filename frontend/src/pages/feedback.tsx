import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Heading, HStack, Stack } from '@chakra-ui/react';
import FeedbackList from 'components/Feedback/FeedbackList';
import CreateFeedbackButton from 'components/Feedback/CreateFeedbackButton';
import { httpClient } from 'api';
import { useQuery } from 'react-query';

const FeedbackPage: FC = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery(
    ['feedback', 'list'],
    () => httpClient.feedback.listFeedback(),
  );

  return (
    <Stack>
      <HStack justifyContent="space-between" alignItems="center">
        <Heading as="h2" size="md">
          {t('dashboard.feedback.your_feedbacks')}
        </Heading>
        <CreateFeedbackButton />
      </HStack>
      <FeedbackList isLoading={isLoading} feedbacks={data} />
    </Stack>
  );
};

export default FeedbackPage;
