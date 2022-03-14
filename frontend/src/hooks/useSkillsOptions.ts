import { useQuery } from 'react-query';
import { httpClient } from 'api';
import { useDebounce } from 'use-debounce';

const useSkillsOptions = (query?: string) => {
  const [value] = useDebounce(query, 100);
  const { data: skills, isFetching } = useQuery(['skills', value], async () => {
    const results = await httpClient.skill.listSkills(value);

    if (!query) {
      return [];
    }

    return results.map((item) => ({
      value: item,
      label: item,
    }));
  }, { cacheTime: 0 });

  return {
    options: skills ?? [],
    isFetching,
  };
};

export default useSkillsOptions;
