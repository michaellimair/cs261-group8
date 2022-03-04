import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Heading,
  HStack,
  Stack,
} from '@chakra-ui/react';
import { httpClient } from 'api';
import { IFeedback, IFeedbackDTO } from 'customTypes/feedback';
import ApiError from 'api/error/ApiError';
import useCommonForm from 'hooks/useCommonForm';
import ContainerBox from 'components/ContainerBox';
import FeedbackFormFields from 'components/Feedback/FeedbackFormFields';
import CreateFeedbackButton from 'components/Feedback/CreateFeedbackButton';
import { useNavigate } from 'react-router-dom';

const CreateFeedbackPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    onSubmit,
    errors,
    register,
    isLoading,
  } = useCommonForm<IFeedbackDTO, ApiError<any>, IFeedback>({
    mutationFn: (feedback: IFeedbackDTO) => httpClient.feedback.createFeedback(feedback),
    mutationId: ['feedback', 'create'],
    onSuccess: ({ id }) => {
      navigate(`../feedbacks/${id}`);
    },
  });

  return (
    <Stack>
      <HStack justifyContent="space-between" alignItems="center">
        <Heading as="h2" size="md">
          {t('dashboard.create_feedback.title')}
        </Heading>
      </HStack>
      <ContainerBox>
        <form onSubmit={onSubmit} data-testid="feedbackForm">
          <FeedbackFormFields
            errors={errors}
            register={register}
          />
          <CreateFeedbackButton isLoading={isLoading} />
        </form>
      </ContainerBox>
    </Stack>
  );
};

export default CreateFeedbackPage;
