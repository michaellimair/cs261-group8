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

interface IMeetingCardDateTimeProps {
  meetingTime: Date;
}

const MeetingCardDateTime: FC<IMeetingCardDateTimeProps> = ({
  meetingTime,
}) => {
  const { t } = useTranslation();

  return (
    <VStack alignContent="right" borderRightWidth="2px" borderColor="gray.100">
      <Heading>
        {meetingTime}
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
        <Text fontSize="sm">Justina Clark</Text>
        <Avatar
          size="sm"
          src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
        />
      </HStack>
    </VStack>
  );
};

export default MeetingCardDateTime;
