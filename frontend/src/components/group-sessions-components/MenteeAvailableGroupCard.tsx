import { FC } from 'react';
import {
  Flex,
  Box,
  Button,
  VStack,
} from '@chakra-ui/react';
import { IGroupCardProps } from 'customTypes/group';
import { t } from 'i18next';
import GroupCardLeft from './GroupCardLeft';

const MenteeAvailableGroupCard: FC<IGroupCardProps> = ({
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
    <Box flex="1.5">
      <VStack align="stretch" pl="8">
        <Button colorScheme="green">{t('accept')}</Button>
      </VStack>
    </Box>
  </Flex>
);

export default MenteeAvailableGroupCard;
