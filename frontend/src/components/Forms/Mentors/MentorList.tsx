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
import { IMatchSuggestion } from 'customTypes/matching';
import LoadingComponent from 'components/LoadingComponent';
import { useTranslation } from 'react-i18next';
import useCountryByCode from 'hooks/useCountryByCode';
import useTimezoneByName from 'hooks/useTimezoneByName';

type MentorId = IMatchSuggestion['mentor']['id'];

interface IMentorListProps {
  recommendations: IMatchSuggestion[];
  currentVotedId: MentorId | null;
  voteMentor: (id: MentorId) => void;
  isLoading: boolean;
  hasData: boolean;
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

const MentorList: FC<IMentorListProps> = ({
  recommendations,
  currentVotedId,
  voteMentor,
  isLoading,
  hasData,
}) => {
  const { t } = useTranslation();

  const handleVoteMentor = useCallback((id: MentorId) => () => {
    voteMentor(id);
  }, [voteMentor]);

  return (
    <LoadingComponent
      isLoading={isLoading}
      hasData={hasData}
      noDataText={t('no_matches')}
    >
      <Stack spacing={6} mb={4}>
        {recommendations.map(({
          mentor,
        }) => (
          <Stack
            w="100%"
            rounded="lg"
            bg="white"
            boxShadow="lg"
            p={4}
            key={mentor.id}
          >
            <HStack spacing="3px">
              <VStack align="right" mr={4}>
                <Avatar size="xl" />
              </VStack>
              <VStack flex="1" align="left" spacing="5px" ml={2}>
                <Heading size="md" alignContent="left">{mentor.full_name}</Heading>
                <Heading size="sm" alignContent="left">{mentor.profile.business_area?.label}</Heading>
                <Text align="left">{mentor.profile.skills?.join(', ')}</Text>
                <CountryText countryCode={mentor.profile.country!} />
                <TimezoneText timezone={mentor.profile.timezone!} />
              </VStack>
              <Button
                rounded="lg"
                border="5px"
                borderColor="gray.700"
                bgColor={mentor.id !== currentVotedId ? 'gray.500' : undefined}
                boxShadow="md"
                py={2}
                px={6}
                colorScheme="green"
                onClick={handleVoteMentor(mentor.id)}
              >
                <Text color="white">{currentVotedId === mentor.id ? `${t('selected')} ✓` : t('select')}</Text>
              </Button>
            </HStack>
          </Stack>
        ))}
      </Stack>
    </LoadingComponent>
  );
};

export default MentorList;
