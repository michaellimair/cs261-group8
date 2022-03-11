import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { httpClient } from 'api';

const useTimezoneOptions = () => {
  const { data: timezoneList } = useQuery('timezones', () => httpClient.timezone.listTimezones());
  return useMemo(() => {
    const fetchedCountries = timezoneList?.map((item) => ({
      label: item.name,
      value: item.code,
    })) ?? [];
    return [
      {
        value: null,
        label: '-',
      },
      ...fetchedCountries,
    ];
  }, [timezoneList]);
};

export default useTimezoneOptions;
