import LoginPage from 'pages/login';
import RegisterPage from 'pages/register';
import WelcomeForm from 'pages/welcome';
import MentorRec from 'pages/mentor-rec';
import { ReactElement } from 'react';

export enum RouteLayout {
  ADMIN = 'admin',
  AUTH = 'auth',
  USER = 'user',
}

export interface IRoute {
  /** Route name is a translation key defined in the translation file. */
  name: string;
  /** Path to be displayed in the browser. Not needed if the route is an index route. */
  path?: string;
  /** Element to be rendered for this route. */
  element: ReactElement;
  /** Layout to be used when displaying the page. */
  layout: RouteLayout;
  /** Indicates that the route is an index. */
  index?: boolean;
  /** Translation key for the description of a certain page, used for metadata purposes. */
  description: string;
}

export const authRoutes: IRoute[] = [
  {
    name: 'login',
    element: <LoginPage />,
    layout: RouteLayout.AUTH,
    index: true,
    description: 'login_description',
  },
  {
    name: 'register',
    element: <RegisterPage />,
    layout: RouteLayout.AUTH,
    path: 'register',
    description: 'register_description',
  },
];

export const userRoutes: IRoute[] = [
  {
    name: 'welcome',
    element: <WelcomeForm />,
    layout: RouteLayout.USER,
    path: 'welcome',
    description: 'welcome_description',
  },
  {
    name: 'recommendations',
    element: <MentorRec />,
    layout: RouteLayout.USER,
    path: 'mentor-recs',
    description: 'mentor_recs',
  },
];
