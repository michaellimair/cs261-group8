import { renderHook } from '@testing-library/react-hooks';
import { httpClient } from 'api';
import { QueryClient, QueryClientProvider } from 'react-query';
import { FC, SyntheticEvent } from 'react';
import useLogout from './useLogout';

jest.mock('api');

const client = new QueryClient();

const wrapper: FC = ({ children }) => (
  <QueryClientProvider client={client}>
    {children}
  </QueryClientProvider>
);

describe('useLogout', () => {
  const { location } = window;

  beforeAll(() => {
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = { assign: jest.fn() };
  });

  afterAll(() => {
    window.location = location;
  });

  it('logs the user out successfully', async () => {
    const mockLogout = jest.fn();
    const { result } = renderHook(() => useLogout(), { wrapper });

    (httpClient.auth.logout as jest.Mock).mockImplementationOnce(mockLogout);

    await result.current.onLogout({
      preventDefault: () => {},
      persist: () => {},
    } as SyntheticEvent);

    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(result.current.isLoggingOut).toBe(false);
    expect(window.location.assign).toHaveBeenCalledWith('/auth');
  });
});
