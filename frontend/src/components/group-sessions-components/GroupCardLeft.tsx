import { FC } from 'react';
import {
  Box,
  Flex,
  Heading,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { t } from 'i18next';
import { IGroupCardProps } from 'customTypes/group';
import GroupMeetingCardDateTime from './GroupMeetingCardDateTime';

const GroupCardLeft: FC<IGroupCardProps> = ({
  title,
  body,
  isTutoring,
  linkToMeeting,
  meetingTime,
  mentor,
}) => (
  <Flex align="center">
    <Box flex="4">
      <VStack align="left">
        <Heading>{title}</Heading>
        <Heading as="h4" size="md">{isTutoring ? t('dashboard.group_meetings.tutoring') : t('dashboard.group_meetings.group_session')}</Heading>
        <Text fontSize={{ base: 'lg' }} textAlign="left" maxW="4xl">
          {body}
        </Text>
        <Link color="teal.500" href={linkToMeeting} isExternal>
          {t('link_to_meeting')}
          {' '}
          <ExternalLinkIcon mx="2px" />
        </Link>
      </VStack>
    </Box>
    <Box flex="2">
      <GroupMeetingCardDateTime
        meetingTime={meetingTime}
        mentor={mentor}
      />
    </Box>
  </Flex>

);

export default GroupCardLeft;
