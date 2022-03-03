import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  VStack,
  Button,
} from '@chakra-ui/react';

const FeedbackButton = () => (
  <VStack align="stretch" pl="8">
    <Button colorScheme="blue">
      Give Feedback
      {' '}
      <ChevronRightIcon />
    </Button>
  </VStack>
);

export default FeedbackButton;
