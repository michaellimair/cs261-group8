import { FC } from 'react';
import {
  Flex,
  Box,
} from '@chakra-ui/react';
import MeetingCardLeft from './MeetingCardLeft';
import MenteeFeedbackBox from './MenteeFeedbackBox';

interface IMeetingCardProps {
  title: string;
  body: string;
  linkToMeeting: string;
  meetingTime: Date;
}

const MenteeCompletedMeetingCard: FC<IMeetingCardProps> = ({
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
      <MenteeFeedbackBox />
    </Box>
  </Flex>

);

export default MenteeCompletedMeetingCard;
