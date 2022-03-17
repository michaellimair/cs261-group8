import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { httpClient } from 'api';

const useLanguages = () => {
  const { data: languageList } = useQuery('languages', () => httpClient.language.listLanguages());

  return useMemo(() => languageList ?? [], [languageList]);
};

export default useLanguages;
