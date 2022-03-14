import {
  Text,
  StackDivider,
  Button,
  Box,
} from '@chakra-ui/react';
import { httpClient } from 'api';
import AddInterest from 'components/Interests/AddInterest';
import InterestList from 'components/Interests/InterestList';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

const ProposeGroupSession = () => {
  const { t } = useTranslation();
  const [interests, setInterests] = useState<string[]>([]);
  const {
    isSuccess,
    mutate,
    isLoading,
    error,
  } = useMutation(
    ['group-sessions', 'propose-session'],
    () => httpClient.menteeGroupSession.proposeGroupSession(interests),
  );
  const deleteInterest = (interestId: string) => {
    const newInterests = interests?.filter((item) => item !== interestId);
    setInterests(newInterests);
  };
  const addInterest = (newInterest: string) => {
    setInterests([...interests, newInterest]);
  };

  return (
    <Box
      verticalAlign="top"
      p="4"
      pl="8"
      pr="8"
      boxShadow="lg"
      m="4"
      borderBottomRadius="lg"
      borderTopRadius="0"
      bg="white"
      divider={<StackDivider borderColor="gray.200" />}
    >
      <Text fontWeight="bold" mb={2}>{t('dashboard.group_meetings.select_topics')}</Text>
      <AddInterest addInterest={addInterest} />
      <InterestList interests={interests} deleteInterest={deleteInterest} />
      <Button colorScheme="blue" w="full" mt={4} disabled={isLoading || isSuccess} onClick={() => mutate()}>
        {t('dashboard.group_meetings.propose_sessions')}
      </Button>
      {isSuccess && (
        <Text mt={2} color="green" fontWeight="bold">
          {t('dashboard.group_meetings.propose_success')}
        </Text>
      )}
      {(error as any)?.data?.non_field_errors && (
      <Text mt={2} color="red" fontWeight="bold">
        {t('dashboard.group_meetings.once_daily')}
      </Text>
      )}
    </Box>
  );
};

export default ProposeGroupSession;
