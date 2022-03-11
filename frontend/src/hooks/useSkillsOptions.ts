import { useQuery } from 'react-query';
import { useMemo } from 'react';
import { httpClient } from 'api';

const useSkillsOptions = () => {
  const { data: skills } = useQuery(['skills'], async () => {
    const results = await httpClient.skill.listSkills();

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
