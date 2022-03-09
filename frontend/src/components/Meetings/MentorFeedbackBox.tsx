import {
  VStack,
  Button,
  Textarea,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const MentorFeedbackBox = () => {
  const { t } = useTranslation();

  return (
    <VStack align="center" alignItems="stretch" pl="8">
      <Textarea
        placeholder={t('write_feedback_here')}
        resize="none"
        size="sm"
        height="180px"
      />
      <Button colorScheme="blue">
        {t('submit_feedback')}
      </Button>
    </VStack>
  );
};

export default MentorFeedbackBox;
