import {
  Stack,
  Heading,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { httpClient } from 'api';
import ApiError from 'api/error/ApiError';
import MenteeRequestList from 'components/Forms/MenteeRequestList';
import { IApiBadRequestErrorData } from 'customTypes/api';
import {
  IInitiateMatchDTO, IMatch, IMatchStatus, IRespondMatchDTO,
} from 'customTypes/matching';
import {
  FC, useCallback, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';

const MentorMatchRequestsPage: FC = () => {
  const { t } = useTranslation();
  const { data: requestList = [], isLoading, refetch } = useQuery<IMatch[]>(
    ['mentor', 'matches'],
    () => httpClient.mentorMatch.getMatches(),
  );
  const { mutateAsync, isLoading: isRequesting } = useMutation<
  IMatch,
  ApiError<IApiBadRequestErrorData<IInitiateMatchDTO>>,
  { id: number } & IRespondMatchDTO
  >(
    ['mentee', 'respond-to-match'],
    (values: { id: number } & IRespondMatchDTO) => httpClient.mentorMatch.respondToMatch(values),
  );

  const onResponse = useCallback(
    async (id: number, status: IRespondMatchDTO['status']) => {
      const result = await mutateAsync({ id, status });
      await refetch();
      return result;
    },
    [mutateAsync, refetch],
  );

  const requests = useMemo(
    () => requestList.filter((it) => it.status === IMatchStatus.PENDING),
    [requestList],
  );

  return (
    <>
      <Stack align="center">
        <Heading fontSize="4xl" mb={4}>
          {t('dashboard.mentor_match_requests.title')}
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
        <MenteeRequestList
          requests={requests}
          isLoading={isLoading}
          hasData={requests.length > 0}
          onResponse={onResponse}
          disabled={isRequesting || isLoading}
        />
      </Box>
    </>
  );
};

export default MentorMatchRequestsPage;
