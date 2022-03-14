import {
  Button,
  Stack,
  Heading,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';
import { httpClient } from 'api';
import ApiError from 'api/error/ApiError';
import MentorList from 'components/Forms/Mentors/MentorList';
import { IApiBadRequestErrorData } from 'customTypes/api';
import { IInitiateMatchDTO, IMatch, IMatchSuggestion } from 'customTypes/matching';
import { useUser } from 'hooks';
import {
  FC, useCallback, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

const MentorRecommendationsPage: FC = () => {
  const { t } = useTranslation();
  const { reauthenticate } = useUser();
  const [voted, setVoted] = useState<number | null>(null);
  const { data: mentorRecommendations = [], isLoading } = useQuery<IMatchSuggestion[]>(
    ['match-suggestions'],
    () => httpClient.menteeMatch.getMatchSuggestions(),
  );
  const { mutateAsync, isLoading: isRequesting } = useMutation<
  IMatch,
  ApiError<IApiBadRequestErrorData<IInitiateMatchDTO>>,
  IInitiateMatchDTO
  >(
    ['mentee', 'request-match'],
    (values: IInitiateMatchDTO) => httpClient.menteeMatch.initiateMatch(values.mentor_id),
  );
  const navigate = useNavigate();

  const voteMentor = useCallback((id: IMatchSuggestion['mentor']['id']) => {
    setVoted(id);
  }, []);

  const onRequestMatch = useCallback(async () => {
    if (!voted) return undefined;
    const matchResult = await mutateAsync({ mentor_id: voted });
    await reauthenticate();
    navigate('../my-mentor');
    return matchResult;
  }, [mutateAsync, voted, reauthenticate, navigate]);

  return (
    <>
      <Stack align="center">
        <Heading fontSize="4xl" mb={4}>
          {t('select_mentors')}
        </Heading>
      </Stack>
      <Box
        w="100%"
        alignContent="center"
        rounded="lg"
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow="lg"
        p={8}
      >
        <MentorList
          recommendations={mentorRecommendations}
          voteMentor={voteMentor}
          isLoading={isLoading}
          hasData={mentorRecommendations.length > 0}
          currentVotedId={voted}
        />
        <Button
          mt={4}
          colorScheme="blue"
          data-testId="submitButton"
          disabled={!voted || isRequesting || isLoading}
          w="full"
          onClick={onRequestMatch}
        >
          {t('request_match')}
        </Button>
      </Box>
    </>
  );
};

export default MentorRecommendationsPage;
