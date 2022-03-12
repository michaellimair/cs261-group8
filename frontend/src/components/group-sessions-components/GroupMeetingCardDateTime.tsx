import { FC } from 'react';
import {
  Text,
  Heading,
  VStack,
  HStack,
  Avatar,
} from '@chakra-ui/react';
import { formatDate, formatTime } from 'libs/date';
import { useTranslation } from 'react-i18next';
import { IUser } from 'customTypes/auth';

interface IGroupMeetingCardDateTimeProps {
  meetingTime: Date;
  originalTimeZone?: string;
  mentor: IUser;
}

const GroupMeetingCardDateTime: FC<IGroupMeetingCardDateTimeProps> = ({
  meetingTime,
  originalTimeZone,
  mentor,
}) => {
  const { t } = useTranslation();

  return (
    <VStack alignContent="right" borderRightWidth="2px" borderColor="gray.100">
      <Heading>
        {formatTime(meetingTime, originalTimeZone)}
        {' '}
        GMT
      </Heading>
      {/* TODO: work this out from the user's timezone */}
      <Text fontSize={{ base: 'xl' }} maxW="4xl">
        (
        {t('local_time')}
        :
        {' '}
        {formatTime(meetingTime)}
        )
      </Text>
      <Text fontSize={{ base: 'lg' }} maxW="4xl">
        {formatDate(meetingTime)}
      </Text>
      {/* TODO: get all this from backend */}
      <HStack>
        <Text fontSize="sm">{mentor.full_name}</Text>
        <Avatar
          size="sm"
          src={mentor.profile.avatar!}
        />
      </HStack>
    </VStack>
  );
};

export default GroupMeetingCardDateTime;
