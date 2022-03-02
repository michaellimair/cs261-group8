import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { httpClient } from 'api';
import ApiError from 'api/error/ApiError';
import UnauthorizedError from 'api/error/UnauthorizedError';
import CredentialManagerFactory from 'factories/CredentialManagerFactory';
import UserFactory from 'factories/UserFactory';
import CredentialManager from 'libs/credential-manager';
import { queryClient } from 'libs/query-client';
import { queryRetryCondition } from 'libs/query-retry';
import { FC, useContext } from 'react';
import { QueryClientProvider } from 'react-query';
import UserContext, { UserContextProvider } from './UserContext';

const mockCredentialManager = (new CredentialManagerFactory()).create('abc', new Date());

jest.mock('api');
jest.mock('libs/credential-manager');

const useTestUserContextHook = () => {
  // eslint-disable-next-line sonarjs/prefer-immediate-return
  const ctx = useContext(UserContext);

  return ctx;
};

queryClient.setDefaultOptions({
  queries: {
    cacheTime: 0,
    retryDelay: 0,
    retry: queryRetryCondition,
  },
});

const wrapper: FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>{children}</UserContextProvider>
  </QueryClientProvider>
);

describe('UserContext', () => {
  const userFactory = new UserFactory();

  it.skip('immediately returns not authorized if user if there are no user credentials', () => {
    const mockEmptyCredentialManager = (new CredentialManagerFactory()).create(null, null);
    (CredentialManager as jest.Mock).mockImplementationOnce(() => mockEmptyCredentialManager);

    const { result } = renderHook(() => useTestUserContextHook(), { wrapper });

    expect(httpClient.auth.me).toHaveBeenCalledTimes(0);
    expect(result.current.user).toBeUndefined();
  });

  it('returns the correct data if the user is authenticated', async () => {
    (CredentialManager as jest.Mock).mockImplementationOnce(() => mockCredentialManager);
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

  // TODO(michaellimair): Fix request not retrying despite retry invoked
  it.skip('retries if there is a server error up to 3 times', async () => {
    let count: number = 0;

    const userQueryFn = async () => {
      throw new ApiError<any>('error');
    };

    const userQueryPromises = [
      userQueryFn(),
      userQueryFn(),
      userQueryFn(),
      userQueryFn()];
    const userQueryFnMock = jest.fn(() => {
      const result = userQueryPromises[count];
      count += 1;
      queryClient.invalidateQueries();
      return result;
    });

    (httpClient.auth.me as jest.Mock).mockImplementationOnce(userQueryFnMock);

    const { result, waitFor } = renderHook(() => useTestUserContextHook(), { wrapper });

    await act(async () => {
      await Promise.all(userQueryPromises.map((p) => p.catch((_) => undefined)));
    });

    await waitFor(() => !result.current.isLoading, { interval: 100 });

    expect(count).toBe(3);
    expect(result.current.isUnauthorized).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('does not retry if there is an unauthorized error', async () => {
    (CredentialManager as jest.Mock).mockImplementationOnce(() => mockCredentialManager);
    let count: number = 0;

    const unauthorizedQueryFn = async () => {
      throw new UnauthorizedError('error');
    };

    const unauthorizedQueryPromises = [
      unauthorizedQueryFn(),
      unauthorizedQueryFn(),
      unauthorizedQueryFn(),
      unauthorizedQueryFn()];
    const userQueryFnMock = jest.fn(() => {
      const result = unauthorizedQueryPromises[count];
      count += 1;
      return result;
    });

    (httpClient.auth.me as jest.Mock).mockImplementationOnce(userQueryFnMock);

    const { result } = renderHook(() => useTestUserContextHook(), { wrapper });

    await act(async () => {
      await Promise.all(unauthorizedQueryPromises.map((p) => p.catch((_) => undefined)));
    });

    expect(count).toBe(1);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isUnauthorized).toBe(true);
  });
});
