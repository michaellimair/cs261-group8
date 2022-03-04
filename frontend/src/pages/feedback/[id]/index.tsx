import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { httpClient } from 'api';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import ContainerBox from 'components/ContainerBox';
import FeedbackIcon from 'components/Feedback/FeedbackIcon';
import RouterLink from 'components/RouterLink';
import ViewFeedbackReply from 'components/Feedback/ViewFeedbackReply';
import LoadingComponent from 'components/LoadingComponent';

const ViewFeedbackPage: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const idNumber = parseInt(id!, 10);
  const {
    data,
    isLoading,
  } = useQuery(
    ['feedback', id, 'view'],
    () => httpClient.feedback.getFeedback(idNumber),
  );

  const {
    title, type, content, created, modified, reply,
  } = data!;

  return (
    <Stack>
      <VStack justifyContent="space-between" alignItems="flex-start" mb={2}>
        <RouterLink to="../feedbacks" mb={2}>
          {`< ${t('dashboard.feedback.back_to_all')}`}
        </RouterLink>
        <Heading as="h2" size="md">
          {t('dashboard.feedback.title')}
        </Heading>
      </VStack>
      <ContainerBox>
        <LoadingComponent hasData={!!data} isLoading={isLoading} noDataText={t('dashboard.feedback.invalid')}>
          <HStack alignItems="center">
            <Text mr={2} fontWeight="bold" fontSize="xl">{title}</Text>
            <FeedbackIcon type={type} />
          </HStack>
          <VStack
            mt={2}
            mb={4}
            direction={{ base: 'column', md: 'row' }}
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Text fontSize={{ base: 'md' }} whiteSpace="pre-wrap">
              {content}
            </Text>
            <Text fontSize={{ base: 'xs' }}>
              {t('created', { created })}
            </Text>
            <Text fontSize={{ base: 'xs' }}>
              {t('modified', { modified })}
            </Text>
          </VStack>
          <Divider />
          <Stack my={4}>
            <ViewFeedbackReply reply={reply} />
          </Stack>
          <Divider />
          <HStack mt={4}>
            <Button as={RouterLink} to="edit" colorScheme="green">
              {t('edit')}
            </Button>
            <Button colorScheme="red">
              {t('delete')}
            </Button>
          </HStack>

        </LoadingComponent>
      </ContainerBox>
    </Stack>
  );
};

export default ViewFeedbackPage;
