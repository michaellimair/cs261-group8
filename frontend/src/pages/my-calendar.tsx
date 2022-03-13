import {
  FC, useEffect, useState,
} from 'react';
import Calendar from 'react-calendar';
import {
  Box,
  Flex, Heading, Stack, Text, VStack,
} from '@chakra-ui/react';
import { formatDate, formatTime } from 'libs/date';
import faker from '@faker-js/faker';
import { addHours } from 'date-fns';
import { nanoid } from 'nanoid';

enum CalendarEventType {
  MEETING = 'meeting',
  WORKSHOP = 'workshop',
  GROUP_SESSION = 'group_session',
}

const getColorByEvent = (eventType: CalendarEventType): string => {
  if (eventType === CalendarEventType.MEETING) {
    return 'yellow.50';
  }
  if (eventType === CalendarEventType.WORKSHOP) {
    return 'cyan.200';
  }
  return 'green.50';
};

const generateRandomEvent = () => {
  const events = [
    CalendarEventType.MEETING,
    CalendarEventType.GROUP_SESSION, CalendarEventType.WORKSHOP];

  return events[Math.floor(Math.random() * 3)];
};

const generateEvent = (eventType: CalendarEventType) => {
  if (eventType === CalendarEventType.MEETING) {
    return ({
      title: `Meeting with ${faker.name.firstName()} ${faker.name.lastName()}`,
      description: `Meeting Title: ${faker.company.catchPhrase()}`,
    });
  }
  if (eventType === CalendarEventType.GROUP_SESSION) {
    return ({
      title: `Group Session - ${faker.company.bs()}`,
      description: `Hosted by ${faker.name.firstName()} ${faker.name.lastName()}`,
    });
  }

  return ({
    title: `Workshop - ${faker.company.catchPhraseNoun()}`,
    description: `Hosted by ${faker.name.firstName()} ${faker.name.lastName()}`,
  });
};

const startTimes = [
  new Date('2021-01-01T09:00:00Z'),
  new Date('2021-01-01T10:00:00Z'),
  new Date('2021-01-01T11:00:00Z'),
  new Date('2021-01-01T12:00:00Z'),
  new Date('2021-01-01T13:00:00Z'),
  new Date('2021-01-01T14:00:00Z'),
  new Date('2021-01-01T15:00:00Z'),
  new Date('2021-01-01T16:00:00Z'),
  new Date('2021-01-01T17:00:00Z'),
  new Date('2021-01-01T18:00:00Z'),
];

const MyCalendarPage: FC = () => {
  const [value, onChange] = useState<Date>(new Date());
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const commands = faker.datatype.number({ min: 3, max: 10 });
    setEvents(
      Array(commands).fill(null).map((_) => {
        const type = generateRandomEvent();
        const event = generateEvent(type);

        return {
          id: nanoid(),
          type,
          event,
        };
      }),
    );
  }, [value]);

  // const borderColor = useColorModeValue('gray.300', 'gray.700');

  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      width="100%"
    >
      <Flex position="sticky" top="0">
        <div>
          <Calendar onChange={onChange} value={value} />
        </div>
      </Flex>
      <Flex width="100%" justifyContent="center">
        <VStack width="100%">
          <Text textAlign="center" fontWeight="bold" fontSize="2xl">{`All calendar events on ${formatDate(value)}`}</Text>
          <Box px={4} width="100%">
            {events.map(({ id, type, event: { title, description } }, i) => (
              <Box bg={getColorByEvent(type)} justifyContent="flex-start" p="4" mb="2" borderRadius={4} width="100%" key={id}>
                <Heading
                  as="h2"
                  fontSize={{ base: 'xl', sm: '2xl' }}
                  mb={2}
                >
                  <Text textTransform="capitalize">{title}</Text>
                </Heading>
                <Text>
                  {formatTime(startTimes[i])}
                  {' '}
                  -
                  {' '}
                  {formatTime(addHours(startTimes[i], 1))}
                </Text>
                <Text>{description}</Text>
              </Box>
            ))}
          </Box>
        </VStack>
      </Flex>
    </Stack>
  );
};

export default MyCalendarPage;
