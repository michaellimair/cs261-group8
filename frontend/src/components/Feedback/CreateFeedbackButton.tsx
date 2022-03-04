import { Button } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const CreateFeedbackButton: FC<{ isLoading: boolean }> = ({
  isLoading,
}) => {
  const { t } = useTranslation();

  return (
    <Button
      mt={4}
      data-testid="create-feedback-button"
      colorScheme="green"
      isLoading={isLoading}
      type="submit"
      loadingText={t('dashboard.create_feedback.loading')}
    >
      {t('dashboard.create_feedback.title')}
    </Button>
  );
};

export default CreateFeedbackButton;
