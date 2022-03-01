import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { httpClient } from 'api';
import UserFactory from 'factories/UserFactory';
import { FC, useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserContext, UserContextProvider } from './UserContext';

jest.mock('api');

const useTestUserContextHook = () => {
  // eslint-disable-next-line sonarjs/prefer-immediate-return
  const ctx = useContext(UserContext);

  return ctx;
};

const queryClient = new QueryClient();

const wrapper: FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>{children}</UserContextProvider>
  </QueryClientProvider>
);

describe('UserContext', () => {
  const userFactory = new UserFactory();

  it('returns the correct data if the user is authenticated', async () => {
    const user = userFactory.create();
    const userQueryFn = async () => user;
    const userQueryPromise = userQueryFn();
    const userQueryFnMock = jest.fn(() => userQueryPromise);

    (httpClient.auth.me as jest.Mock).mockImplementationOnce(userQueryFnMock);

    const { result } = renderHook(() => useTestUserContextHook(), { wrapper });

    await act(async () => {
      await userQueryPromise;
    });

    expect(userQueryFnMock).toHaveBeenCalledTimes(1);
    expect(result.current.user).toEqual(user);
  });
});
