import { Stack } from '@chakra-ui/react';
import { FC } from 'react';
import MeetingDetails from '../MeetingDetails';
import PendingMeeting from '../PendingMeeting';

const RequestedMeeting: FC = () => (
  <Stack m="20px" spacing={50} direction={['column', 'row']} maxW="750px">
    <MeetingDetails />
    <PendingMeeting />
  </Stack>
);

export default RequestedMeeting;
