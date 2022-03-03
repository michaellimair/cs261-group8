import {
  VStack,
  Button,
} from '@chakra-ui/react';

const AcceptRescheduleButtons = () => (
  <VStack align="stretch" pl="8">
    <Button colorScheme="green">Accept</Button>
    <Button colorScheme="red">Reschedule</Button>
  </VStack>
);

export default AcceptRescheduleButtons;
