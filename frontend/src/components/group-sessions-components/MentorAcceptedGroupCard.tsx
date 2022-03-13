import { FC } from 'react';
import {
  Flex,
  Box,
} from '@chakra-ui/react';
import { IGroupCardProps } from 'customTypes/group';
import GroupCardLeft from './GroupCardLeft';

const MentorAcceptedGroupCard: FC<IGroupCardProps> = ({
  title,
  body,
  isTutoring,
  linkToMeeting,
  meetingTime,
  mentor,
}) => (
  <Flex align="center" p="4" pl="8" pr="8" boxShadow="lg" m="4" borderRadius="lg" bg="white">
    <Box flex="5">
      <GroupCardLeft
        title={title}
        body={body}
        isTutoring={isTutoring}
        linkToMeeting={linkToMeeting}
        meetingTime={meetingTime}
        mentor={mentor}
      />
    </Box>
  </Flex>
);

export default MentorAcceptedGroupCard;
