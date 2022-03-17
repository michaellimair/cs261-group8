import { useQuery } from 'react-query';
import { httpClient } from 'api';

const useTimezoneOptions = () => {
  const { data: timezoneList } = useQuery('timezones', () => httpClient.timezone.listTimezones());
  return timezoneList ?? [];
};

export default useTimezoneOptions;
