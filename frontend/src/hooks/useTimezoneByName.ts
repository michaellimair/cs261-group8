import { useQuery } from 'react-query';
import { httpClient } from 'api';

const useTimezoneByName = (name?: string) => {
  const { data: timezone } = useQuery(['timezones', name], () => {
    if (!name) {
      return undefined;
    }
    return httpClient.timezone.getByTimezoneName(name);
  });

  return timezone;
};

export default useTimezoneByName;
