import { Stack } from '@chakra-ui/react';
import { FC } from 'react';
import AcceptedMeeting from '../AcceptedMeeting';
import MeetingDetails from '../MeetingDetails';

const UpcomingMeeting: FC = () => (
  <Stack m="20px" spacing={50} direction={['column', 'row']} maxW="750px">
    <MeetingDetails />
    <AcceptedMeeting />
  </Stack>
);

export default UpcomingMeeting;
