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
      data-testid="create-plan-button"
      colorScheme="green"
      isLoading={isLoading}
      type="submit"
      loadingText={t('create_plan.loading')}
    >
      {t('create_plan.title')}
    </Button>
  );
};

export default CreateFeedbackButton;
