import { FC, useMemo } from 'react';
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
import { useUser } from 'hooks';

interface IGroupMeetingCardDateTimeProps {
  meetingTime: Date;
  hostTimezone?: string;
  mentor: IUser;
}

const GroupMeetingCardDateTime: FC<IGroupMeetingCardDateTimeProps> = ({
  meetingTime,
  hostTimezone,
  mentor,
}) => {
  const { t } = useTranslation();
  const { user } = useUser();
  const myTimezone = useMemo(() => (user?.profile?.timezone ?? undefined), [user]);

  return (
    <VStack alignContent="right" borderRightWidth="2px" borderColor="gray.100">
      <Heading>
        {`${t('mentor_time')}: ${formatTime(meetingTime, hostTimezone)}`}
      </Heading>
      {/* TODO: work this out from the user's timezone */}
      {mentor.id !== user?.id && hostTimezone !== myTimezone && (
      <Text fontSize={{ base: 'xl' }} maxW="4xl">
        {`(${t('local_time')}: ${formatTime(meetingTime, myTimezone)})`}
      </Text>
      )}
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
