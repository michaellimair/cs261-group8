import { useQuery } from 'react-query';
import { IUser } from 'customTypes/auth';
import {
  createContext, FC, useCallback, useMemo,
} from 'react';
import { httpClient } from 'api';
import ApiError from 'api/error/ApiError';
import UnauthorizedError from 'api/error/UnauthorizedError';
import { RetryValue } from 'react-query/types/core/retryer';

interface IUserContext {
  user?: IUser;
  refetch: () => void;
  isLoading: boolean;
  isUnauthorized: boolean;
}

const UserContext = createContext<IUserContext>({
  isLoading: true,
  refetch: () => {},
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
    },
  );

  const ctx: IUserContext = useMemo(() => ({
    user: data,
    isLoading,
    refetch,
    isUnauthorized: UnauthorizedError.isUnauthorizedError(error),
  }), [data, isLoading, refetch, error]);

  return (
    <UserContext.Provider value={ctx}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
