import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { httpClient } from 'api';

const useCountries = () => {
  const { data: countryList } = useQuery('countries', () => httpClient.country.listCountries());

  return useMemo(() => {
    const fetchedCountries = countryList?.map((item) => ({
      label: item.name,
      value: item.alpha_2,
    })) ?? [];
    return [
      {
        value: null,
        label: '-',
      },
      ...fetchedCountries,
    ];
  }, [countryList]);
};

export default useCountries;
