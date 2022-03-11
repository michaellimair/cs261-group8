import { useQuery } from 'react-query';
import { useMemo } from 'react';
import { httpClient } from 'api';

const useBusinessAreaOptions = () => {
  const { data: businessAreas } = useQuery(['business-areas'], async () => {
    const results = await httpClient.businessArea.listBusinessAreas();

    return results.map(({ label, id }) => ({
      value: id,
      label,
    }));
  });

  return useMemo(() => [
    {
      value: null,
      label: '-',
    },
    ...(businessAreas ?? []),
  ], [businessAreas]);
};

export default useBusinessAreaOptions;
