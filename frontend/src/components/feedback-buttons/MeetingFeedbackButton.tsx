// import { ArrowForwardIcon } from '@chakra-ui/icons';
import { ArrowRightIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { FC } from 'react';

const MeetingFeedbackButton: FC = () => (
  <Button rightIcon={<ArrowRightIcon />} size="md" width="150px" colorScheme="purple">Feedback</Button>
);

export default MeetingFeedbackButton;
