import InitializingApp from 'components/InitializingApp';
import { useUser } from 'hooks/useUser';
import { FC } from 'react';
import { Navigate } from 'react-router-dom';

const FallbackPage: FC = () => {
  const { isLoading, isLoggedIn } = useUser();

  return (
    <>
      {isLoading && (
        <InitializingApp />
      )}
      {!isLoading && !isLoggedIn && (
        <Navigate replace to="/auth" />
      )}
      {!isLoading && isLoggedIn && (
        <Navigate replace to="/dashboard" />
      )}
    </>
  );
};

export default FallbackPage;
