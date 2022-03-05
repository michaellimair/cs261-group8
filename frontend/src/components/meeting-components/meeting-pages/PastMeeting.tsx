import { Stack } from '@chakra-ui/react';
import { FC } from 'react';
import MeetingDetails from '../MeetingDetails';
import MeetingFeedback from '../MeetingFeedback';

const PastMeeting: FC = () => (
  <Stack m="20px" spacing={50} direction={['column', 'row']} width="fit-content">
    <MeetingDetails />
    <MeetingFeedback />
  </Stack>
);

export default PastMeeting;
