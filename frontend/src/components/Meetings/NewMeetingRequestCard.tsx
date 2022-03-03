import { FC } from 'react';
import {
  StackDivider,
  Flex,
  Box,
  // Spacer,
} from '@chakra-ui/react';
import MeetingCardLeft from './MeetingCardLeft';
import AcceptRescheduleButtons from './AcceptRescheduleButtons';

interface IMeetingCardProps {
  title: string;
  body: string;
  linkToMeeting: string;
  meetingTime: string;
  meetingDate: string;
}

const NewMeetingRequestCard: FC<IMeetingCardProps> = ({
  title,
  body,
  linkToMeeting,
  meetingTime,
  meetingDate,
}) => (
  <Flex align="center" p="4" pl="8" pr="8" boxShadow="lg" m="4" borderRadius="lg" bg="white" divider={<StackDivider borderColor="gray.200" />}>
    <Box flex="5">
      <MeetingCardLeft
        title={title}
        body={body}
        linkToMeeting={linkToMeeting}
        meetingTime={meetingTime}
        meetingDate={meetingDate}
      />
    </Box>
    {/* <Spacer flex="0.5" borderRightWidth="2px" borderColor="gray.100" /> */}
    <Box flex="1.5">
      <AcceptRescheduleButtons />
    </Box>
  </Flex>
);

export default NewMeetingRequestCard;
