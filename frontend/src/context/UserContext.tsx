import { useQuery } from 'react-query';
import { IUser } from 'customTypes/auth';
import {
  createContext, FC, useMemo, useState,
} from 'react';
import { httpClient } from 'api';
import ApiError from 'api/error/ApiError';
import UnauthorizedError from 'api/error/UnauthorizedError';
import CredentialManager from 'libs/credential-manager';

export interface IUserContext {
  user?: IUser;
  refetch: () => Promise<any>;
  isLoading: boolean;
  isUnauthorized: boolean;
}

const UserContext = createContext<IUserContext>({
  isLoading: true,
  refetch: async () => {},
  isUnauthorized: false,
});

export const UserContextProvider: FC = ({ children }) => {
  const [credentialManager] = useState(new CredentialManager());
  const {
    data, refetch, isLoading, error,
  } = useQuery<IUser, ApiError<any>>(
    ['user', 'me'],
    {
      queryFn: async () => httpClient.auth.me(),
      cacheTime: 0,
      enabled: !!credentialManager.credentials.token,
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
