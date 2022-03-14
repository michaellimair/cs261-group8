import { httpClient } from 'api';
import { UserGroup } from 'customTypes/auth';
import { useQuery } from 'react-query';
import { useUser } from './useUser';

const useMyMentoringPairs = (role: UserGroup) => {
  const { user } = useUser();
  const { data, isLoading } = useQuery(['my-pairing', role], () => {
    if (user?.groups?.find(({ name }) => name === role)) {
      return httpClient.menteeMatch.getMatches();
    }
    return undefined;
  });

  return { data, isLoading };
};

export default useMyMentoringPairs;
