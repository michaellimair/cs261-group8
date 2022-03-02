import { useUser } from 'hooks/useUser';
import { FC } from 'react';
import { Navigate } from 'react-router-dom';

const FallbackPage: FC = () => {
  const { isLoading, isLoggedIn } = useUser();

  return (
    <div className="App">
      {!isLoading && !isLoggedIn && (
        <Navigate replace to="/auth" />
      )}
      {!isLoading && isLoggedIn && (
        <Navigate replace to="/dashboard" />
      )}
    </div>
  );
};

export default FallbackPage;
