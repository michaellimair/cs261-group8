import { FC } from 'react';
import {
  Box,
  Flex,
} from '@chakra-ui/react';
import MeetingCardInfo from 'components/Meetings/MeetingCardInfo';
import MeetingCardDateTimeIcon from './MeetingCardDateTimeIcon';

interface IMeetingCardProps {
  title: string;
  body: string;
  linkToMeeting: string;
  meetingTime: string;
  meetingDate: string;
}

const MeetingCardLeft: FC<IMeetingCardProps> = ({
  title,
  body,
  linkToMeeting,
  meetingTime,
  meetingDate,
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
      <MeetingCardDateTimeIcon
        meetingTime={meetingTime}
        meetingDate={meetingDate}
      />
    </Box>
  </Flex>

);

export default MeetingCardLeft;
