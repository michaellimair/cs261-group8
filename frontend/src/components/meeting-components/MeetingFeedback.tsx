import { ArrowRightIcon } from '@chakra-ui/icons';
import {
  Box, Button, Center,
} from '@chakra-ui/react';
import { FC } from 'react';

const MeetingFeedback: FC = () => (
  <Box right="100px">
    <Center>
      <Button size="md" width="150px" colorScheme="purple">
        Feedback
        <ArrowRightIcon />
      </Button>
    </Center>
  </Box>
);

export default MeetingFeedback;
