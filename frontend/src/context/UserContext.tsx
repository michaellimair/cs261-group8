import { useQuery } from 'react-query';
import { IUser } from 'customTypes/auth';
import {
  createContext, FC, useCallback, useMemo,
} from 'react';
import { httpClient } from 'api';
import ApiError from 'api/error/ApiError';
import UnauthorizedError from 'api/error/UnauthorizedError';
import { RetryValue } from 'react-query/types/core/retryer';

export interface IUserContext {
  user?: IUser;
  refetch: () => Promise<void>;
  isLoading: boolean;
  isUnauthorized: boolean;
}

const UserContext = createContext<IUserContext>({
  isLoading: true,
  refetch: async () => {},
  isUnauthorized: false,
});

export const UserContextProvider: FC = ({ children }) => {
  const retryFn: RetryValue<ApiError<any>> = useCallback((failureCount, err) => {
    if (failureCount >= 3) {
      return false;
    }
    return !UnauthorizedError.isUnauthorizedError(err);
  }, []);

  const {
    data, refetch, isLoading, error,
  } = useQuery<IUser, ApiError<any>>(
    ['user', 'me'],
    {
      retry: retryFn,
      queryFn: () => httpClient.auth.me(),
      cacheTime: 0,
    },
  );

  const ctx: IUserContext = useMemo(() => ({
    user: data,
    isLoading,
    refetch: async () => {
      await refetch();
    },
    isUnauthorized: UnauthorizedError.isUnauthorizedError(error),
  }), [data, isLoading, refetch, error]);

  return (
    <UserContext.Provider value={ctx}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
