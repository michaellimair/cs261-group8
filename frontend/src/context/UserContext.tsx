import { useQuery } from 'react-query';
import { IUser } from 'customTypes/auth';
import {
  createContext, FC, useMemo,
} from 'react';
import { httpClient } from 'api';

interface IUserContext {
  user?: IUser;
  refetch: () => void;
  isLoading: boolean;
  initialized: boolean;
}

const UserContext = createContext<IUserContext>({
  initialized: false,
  isLoading: true,
  refetch: () => {},
});

export const UserContextProvider: FC = ({ children }) => {
  const { data, refetch, isLoading } = useQuery<IUser>({
    retry: false, // TODO(michaellimair): Implement retry mechanism
    queryFn: () => httpClient.auth.me(),
  });

  const ctx: IUserContext = useMemo(() => ({
    user: data,
    isLoading,
    initialized: Boolean(data),
    refetch,
  }), [data, isLoading, refetch]);

  return (
    <UserContext.Provider value={ctx}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
