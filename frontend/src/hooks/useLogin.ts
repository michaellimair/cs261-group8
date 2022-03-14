import { httpClient } from 'api';
import { ILogin } from 'customTypes/auth';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './useUser';

const useLogin = () => {
  const { reauthenticate } = useUser();
  const navigate = useNavigate();

  const login = useCallback(async (values: ILogin) => {
    const result = await httpClient.auth.login(values);
    await reauthenticate();
    navigate('../dashboard', { replace: true });
    return result;
  }, [navigate, reauthenticate]);

  return {
    login,
  };
};

export default useLogin;
