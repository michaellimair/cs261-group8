import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import { authRoutes, userRoutes } from 'routes';
import AuthLayout from 'layouts/AuthLayout';
import UserLayout from 'layouts/UserLayout';
import useUserDashboardRoutes from 'hooks/useUserDashboardRoutes';
import FallbackPage from 'pages/fallback';

const App: FC = () => {
  const allowedDashboardRoutes = useUserDashboardRoutes(false);

  return (
    <Router>
      <Routes>
        <Route path="auth" element={<AuthLayout />}>
          {authRoutes.map(({
            name, path, element, index,
          }) => (
            <Route key={name} path={path} element={element} index={index} />
          ))}
        </Route>
        <Route path="dashboard" element={<UserLayout />}>
          {allowedDashboardRoutes.map(({
            name, path, element, index,
          }) => (
            <Route key={name} path={path} element={element} index={index} />
          ))}
        </Route>
        <Route path="*" element={<FallbackPage />} />
      </Routes>
    </Router>
  );
};

export default App;
