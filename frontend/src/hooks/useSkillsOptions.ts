import { useQuery } from 'react-query';
import { useMemo } from 'react';
import { httpClient } from 'api';
import { useDebounce } from 'use-debounce';

const useSkillsOptions = (query?: string) => {
  const [value] = useDebounce(query, 100);
  const { data: skills } = useQuery(['skills', value], async () => {
    const results = await httpClient.skill.listSkills(value);

    if (!query) {
      return [];
    }

    return results.map((item) => ({
      value: item,
      label: item,
    }));
  });

  return useMemo(() => [
    {
      value: null,
      label: '-',
    },
    ...(skills ?? []),
  ], [skills]);
};

export default useSkillsOptions;
