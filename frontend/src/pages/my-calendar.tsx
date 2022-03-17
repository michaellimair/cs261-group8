import {
  FC, useState,
} from 'react';
import Calendar from 'react-calendar';
import {
  Box,
  Flex, Heading, Stack, Text, VStack,
} from '@chakra-ui/react';
import differenceInDays from 'date-fns/differenceInDays';
import { formatDate, formatTime } from 'libs/date';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { httpClient } from 'api';
import LoadingComponent from 'components/LoadingComponent';

const MyCalendarPage: FC = () => {
  const [value, onChange] = useState<Date>(new Date());
  const { t } = useTranslation();
  const { data, isLoading } = useQuery(
    ['events'],
    () => httpClient.events.listEvents(),
  );

  const eventsForDay = data?.filter((it) => differenceInDays(it.start_time, value) === 0);

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
            <LoadingComponent
              hasData={Boolean(eventsForDay && eventsForDay.length > 0)}
              isLoading={isLoading}
              noDataText={t('my_calendar.no_events')}
            >
              {data?.map(({
                id, title, description, start_time, end_time,
              }) => (
                <Box bgColor="blue" justifyContent="flex-start" p="4" mb="2" borderRadius={4} width="100%" key={id}>
                  <Heading
                    as="h2"
                    fontSize={{ base: 'xl', sm: '2xl' }}
                    mb={2}
                  >
                    <Text textTransform="capitalize">{title}</Text>
                  </Heading>
                  <Text>
                    {`${formatTime(start_time)} - ${formatTime(end_time)}`}
                  </Text>
                  <Text>{description}</Text>
                </Box>
              ))}
            </LoadingComponent>
          </Box>
        </VStack>
      </Flex>
    </Stack>
  );
};

export default MyCalendarPage;
