import { useQuery } from 'react-query';
import { httpClient } from 'api';

const useCountryByCode = (code?: string) => {
  const { data: country } = useQuery(['countries', code], () => {
    if (!code) {
      return undefined;
    }
    return httpClient.country.getCountryByCode(code);
  });

  return country;
};

export default useCountryByCode;
