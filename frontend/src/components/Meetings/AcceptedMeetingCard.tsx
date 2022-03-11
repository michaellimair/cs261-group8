import { FC } from 'react';
import {
  StackDivider,
  Flex,
  Box,
} from '@chakra-ui/react';
import MeetingCardLeft from './MeetingCardLeft';
import AcceptedText from './AcceptedText';

interface IMeetingCardProps {
  title: string;
  body: string;
  linkToMeeting: string;
  meetingTime: Date;
}

const AcceptedMeetingCard: FC<IMeetingCardProps> = ({
  title,
  body,
  linkToMeeting,
  meetingTime,
}) => (
  <Flex align="center" p="4" pl="8" pr="8" boxShadow="lg" m="4" borderRadius="lg" bg="white" divider={<StackDivider borderColor="gray.200" />}>
    <Box flex="5">
      <MeetingCardLeft
        title={title}
        body={body}
        linkToMeeting={linkToMeeting}
        meetingTime={meetingTime}
      />
    </Box>
    <Box flex="1.5">
      <AcceptedText />
    </Box>
  </Flex>
);

export default AcceptedMeetingCard;