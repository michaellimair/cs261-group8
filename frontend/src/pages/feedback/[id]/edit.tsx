import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Heading,
  HStack,
  Stack,
} from '@chakra-ui/react';
import { httpClient } from 'api';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import ContainerBox from 'components/ContainerBox';
import FeedbackFormFields from 'components/Feedback/FeedbackFormFields';
import useCommonForm from 'hooks/useCommonForm';
import { IFeedbackDTO, IFeedback } from 'customTypes/feedback';
import ApiError from 'api/error/ApiError';
import EditFeedbackButton from 'components/Feedback/EditFeedbackButton';
import RouterLink from 'components/RouterLink';
import LoadingComponent from 'components/LoadingComponent';

const EditFeedbackPage: FC = () => {
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

  const navigate = useNavigate();

  const {
    onSubmit,
    errors,
    register,
    isLoading: isSubmitting,
    reset,
  } = useCommonForm<IFeedbackDTO, ApiError<any>, IFeedback>({
    defaultValues: data,
    mutationFn: (feedback: IFeedbackDTO) => httpClient.feedback.updateFeedback(
      idNumber,
      feedback,
    ),
    mutationId: ['feedback', idNumber, 'update'],
    onSuccess: (result) => {
      navigate(`../feedbacks/${result.id}`);
    },
  });

  useEffect(() => {
    if (!isLoading && data) {
      reset(data);
    }
  }, [isLoading, data, reset]);

  return (
    <Stack>
      <Heading as="h2" size="md">
        {t('dashboard.edit_feedback.title')}
      </Heading>
      <ContainerBox>
        <LoadingComponent noDataText={t('dashboard.feedback.invalid')} hasData={!!data} isLoading={isLoading}>
          <form onSubmit={onSubmit} data-testid="feedbackForm">
            <FeedbackFormFields
              errors={errors}
              register={register}
            />
            <HStack mt={4}>
              <EditFeedbackButton isLoading={isSubmitting} />
              <Button as={RouterLink} to={`../feedbacks/${id}`} colorScheme="red">
                {t('dashboard.edit_feedback.cancel')}
              </Button>
            </HStack>
          </form>
        </LoadingComponent>
      </ContainerBox>
    </Stack>
  );
};

export default EditFeedbackPage;
