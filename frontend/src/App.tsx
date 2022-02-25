import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
// import MenteeMeetingPage from 'pages/mentee-dashboard/MenteeMeetingPage';
// import MentorMeetingPage from 'pages/mentor-dashboard/MentorMeetingPage';
// import MentorMilestonePage from 'pages/mentor-dashboard/MentorMilestonePage';
// import MenteeMilestonePage from 'pages/mentee-dashboard/MenteeMilestonePage';
// import MenteeList from 'pages/mentor-dashboard/MenteeList';
import UserProfile from 'pages/identity/UserProfile';
import { authRoutes } from './routes';
import AuthLayout from './layouts/AuthLayout';

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
      <Route path="*" element={<UserProfile />} />
    </Routes>
  </Router>
);

export default App;
