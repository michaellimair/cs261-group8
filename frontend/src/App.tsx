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
import NotFoundPage from 'pages/not-found';

const App: FC = () => (
  <Router>
    <Routes>
      <Route path="auth" element={<AuthLayout />}>
        {authRoutes.map(({
          name, path, element, index,
        }) => (
          <Route key={name} path={path} element={element} index={index} />
        ))}
      </Route>
      <Route path="user" element={<UserLayout />}>
        {userRoutes.map(({
          name, path, element, index,
        }) => (
          <Route key={name} path={path} element={element} index={index} />
        ))}
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default App;
