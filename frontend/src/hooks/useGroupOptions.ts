import { useQuery } from 'react-query';
import { httpClient } from 'api';

const useGroupOptions = () => {
  const { data: groups } = useQuery(['groups'], async () => httpClient.group.listGroups());

  return groups;
};

export default useGroupOptions;
