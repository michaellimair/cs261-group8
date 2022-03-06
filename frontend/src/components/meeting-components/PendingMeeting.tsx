import { Button, Stack } from '@chakra-ui/react';
import { FC } from 'react';

const PendingMeeting: FC = () => (
  <Stack direction="column" spacing={2} align="center">
    <Button size="md" width="150px" colorScheme="blue">Accept</Button>
    <Button size="md" width="150px" colorScheme="red">Reschedule</Button>
  </Stack>
);

export default PendingMeeting;
