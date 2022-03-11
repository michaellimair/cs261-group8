import { FC } from 'react';
import {
  Flex,
  Box,
  // Spacer,
} from '@chakra-ui/react';
import MeetingCardLeft from './MeetingCardLeft';
import MentorFeedbackBox from './MentorFeedbackBox';

interface IMeetingCardProps {
  title: string;
  body: string;
  linkToMeeting: string;
  meetingTime: Date;
}

const MentorCompletedMeetingCard: FC<IMeetingCardProps> = ({
  title,
  body,
  linkToMeeting,
  meetingTime,
}) => (
  <Flex verticalAlign="top" align="center" p="4" pl="8" pr="8" boxShadow="lg" m="4" borderRadius="lg" bg="white">
    <Box flex="5">
      <MeetingCardLeft
        title={title}
        body={body}
        linkToMeeting={linkToMeeting}
        meetingTime={meetingTime}
      />
    </Box>
    <Box flex="1.5">
      <MentorFeedbackBox />
    </Box>
  </Flex>

);

export default MentorCompletedMeetingCard;
