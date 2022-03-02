import { httpClient } from 'api';
import { useCallback } from 'react';
import { useMutation } from 'react-query';

const useLogout = () => {
  const { mutateAsync, isLoading: isLoggingOut } = useMutation<void>(['logout'], () => httpClient.auth.logout());

  const onLogout = useCallback(async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await mutateAsync();

    // Hack so that the browser state is totally refreshed
    window.location.assign('/auth');
  }, [mutateAsync]);

  return { onLogout, isLoggingOut };
};

export default useLogout;
