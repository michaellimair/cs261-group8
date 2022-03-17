import { QueryClient } from 'react-query';
import { queryRetryCondition } from 'libs/query-retry';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // If error is not a 404 error, allow retry
      retry: queryRetryCondition,
      cacheTime: 0,
    },
  },
});
