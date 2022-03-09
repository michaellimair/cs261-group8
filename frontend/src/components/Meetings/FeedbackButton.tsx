import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  VStack,
  Button,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const FeedbackButton = () => {
  const { t } = useTranslation();

  return (
    <VStack align="stretch" pl="8">
      <Button colorScheme="blue">
        {`${t('give_feedback')} `}
        <ChevronRightIcon />
      </Button>
    </VStack>
  );
};

export default FeedbackButton;
