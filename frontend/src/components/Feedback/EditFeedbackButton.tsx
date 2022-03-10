import { Button } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const EditFeedbackButton: FC<{ isLoading: boolean }> = ({
  isLoading,
}) => {
  const { t } = useTranslation();

  return (
    <Button
      data-testid="edit-feedback-button"
      colorScheme="green"
      isLoading={isLoading}
      type="submit"
      loadingText={t('dashboard.edit_feedback.loading')}
    >
      {t('dashboard.edit_feedback.title')}
    </Button>
  );
};

export default EditFeedbackButton;
