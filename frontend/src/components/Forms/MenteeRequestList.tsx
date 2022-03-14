import {
  HStack,
  VStack,
  Stack,
  Text,
  Avatar,
  Heading,
  Button,
} from '@chakra-ui/react';
import React, { FC, useCallback } from 'react';
import { TiTick, TiTimes } from 'react-icons/ti';
import { IMatch, IMatchStatus } from 'customTypes/matching';
import LoadingComponent from 'components/LoadingComponent';
import { useTranslation } from 'react-i18next';
import useCountryByCode from 'hooks/useCountryByCode';
import useTimezoneByName from 'hooks/useTimezoneByName';

type MenteeId = IMatch['mentee']['id'];

interface IMenteeRequestListProps {
  requests: IMatch[];
  onResponse: (id: MenteeId, status: IMatchStatus.ACCEPTED | IMatchStatus.REJECTED) => void;
  isLoading: boolean;
  hasData: boolean;
  disabled: boolean;
}

const CountryText: FC<{ countryCode: string }> = ({
  countryCode,
}) => {
  const country = useCountryByCode(countryCode);

  return <Text align="left">{country?.name}</Text>;
};

const TimezoneText: FC<{ timezone: string }> = ({
  timezone,
}) => {
  const tzData = useTimezoneByName(timezone);

  return <Text align="left">{`Timezone: ${tzData?.name}`}</Text>;
};

const MenteeRequestList: FC<IMenteeRequestListProps> = ({
  requests,
  onResponse,
  isLoading,
  hasData,
  disabled,
}) => {
  const { t } = useTranslation();

  const handleResponse = useCallback((
    id: MenteeId,
    status: IMatchStatus.ACCEPTED | IMatchStatus.REJECTED,
  ) => () => {
    onResponse(id, status);
  }, [onResponse]);

  return (
    <LoadingComponent
      isLoading={isLoading}
      hasData={hasData}
      noDataText={t('dashboard.mentor_match_requests.no_requests')}
    >
      <Stack spacing={6} mb={4}>
        {requests.map(({
          mentee,
          id,
          mentee_id,
        }) => (
          <Stack
            w="100%"
            rounded="lg"
            bg="white"
            boxShadow="lg"
            p={4}
            key={mentee_id}
          >
            <HStack spacing="3px">
              <VStack align="right" mr={4}>
                <Avatar size="xl" />
              </VStack>
              <VStack flex="1" align="left" spacing="5px" ml={2}>
                <Heading size="md" alignContent="left">{mentee.full_name}</Heading>
                <Heading size="sm" alignContent="left">
                  {t(`job_title.${mentee.profile.title}`)}
                  {' '}
                  -
                  {' '}
                  {mentee.profile.business_area?.label}
                </Heading>
                <Text align="left">{mentee.profile.skills?.join(', ')}</Text>
                <CountryText countryCode={mentee.profile.country!} />
                <TimezoneText timezone={mentee.profile.timezone!} />
              </VStack>
              <Button
                rounded="full"
                boxShadow="md"
                size="lg"
                py={2}
                px={2}
                marginRight="8px !important"
                colorScheme="red"
                disabled={disabled}
                onClick={handleResponse(id, IMatchStatus.REJECTED)}
              >
                <TiTimes />
              </Button>
              <Button
                rounded="full"
                boxShadow="md"
                size="lg"
                py={2}
                px={2}
                colorScheme="green"
                disabled={disabled}
                onClick={handleResponse(id, IMatchStatus.ACCEPTED)}
              >
                <TiTick />
              </Button>
            </HStack>
          </Stack>
        ))}
      </Stack>
    </LoadingComponent>
  );
};

export default MenteeRequestList;
