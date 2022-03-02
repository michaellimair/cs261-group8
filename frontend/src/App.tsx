import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import { authRoutes } from 'routes';
import AuthLayout from 'layouts/AuthLayout';
import NotFoundPage from 'pages/not-found';
import UserLayout from 'layouts/UserLayout';
import useUserDashboardRoutes from 'hooks/useUserDashboardRoutes';

const App: FC = () => {
  const allowedDashboardRoutes = useUserDashboardRoutes();

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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
