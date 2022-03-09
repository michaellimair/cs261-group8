import { FC } from 'react';
import {
  Box,
  Flex,
} from '@chakra-ui/react';
import MeetingCardInfo from 'components/Meetings/MeetingCardInfo';
import MeetingCardDateTime from './MeetingCardDateTime';

interface IMeetingCardProps {
  title: string;
  body: string;
  linkToMeeting: string;
  meetingTime: Date;
}

const MeetingCardLeft: FC<IMeetingCardProps> = ({
  title,
  body,
  linkToMeeting,
  meetingTime,
}) => (
  <Flex align="center">
    <Box flex="4">
      <MeetingCardInfo
        title={title}
        body={body}
        linkToMeeting={linkToMeeting}
      />
    </Box>
    <Box flex="2">
      <MeetingCardDateTime
        meetingTime={meetingTime}
      />
    </Box>
  </Flex>

);

export default MeetingCardLeft;
