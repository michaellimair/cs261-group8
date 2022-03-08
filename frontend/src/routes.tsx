import { UserGroup } from 'customTypes/auth';
import DashboardHomePage from 'pages/dashboard/dashboard';
import DashboardMenteeOnlyPage from 'pages/dashboard/mentee-only';
import DashboardMentorOnlyPage from 'pages/dashboard/mentor-only';
import FeedbackPage from 'pages/feedback';
import LoginPage from 'pages/login';
import RegisterPage from 'pages/register';
import { ReactElement } from 'react';
import { IconType } from 'react-icons';
import {
  FiHome,
  FiShield,
} from 'react-icons/fi';
import { VscFeedback } from 'react-icons/vsc';
import { IoSchool } from 'react-icons/io5';
import CreateFeedbackPage from 'pages/feedback/create';
import ViewFeedbackPage from 'pages/feedback/[id]';
import EditFeedbackPage from 'pages/feedback/[id]/edit';
import UserProfile from 'pages/identity/UserProfile';

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

export interface IDashboardRoute extends IRoute {
  /** Defines the user groups which are allowed to access the route. */
  allowedGroups: UserGroup[];
  /** Icon to be displayed in the sidebar. */
  icon?: IconType;
  /** Hides the route from the sidebar. */
  hide?: boolean;
  /** Subroutes under the same dashboard route. */
  children?: IDashboardRoute[];
}

const ALLOW_ALL_USERS: UserGroup[] = [UserGroup.MENTOR, UserGroup.MENTEE];
const MENTOR_ONLY: UserGroup[] = [UserGroup.MENTOR];
const MENTEE_ONLY: UserGroup[] = [UserGroup.MENTEE];

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

export const dashboardRoutes: IDashboardRoute[] = [
  {
    name: 'home',
    element: <DashboardHomePage />,
    layout: RouteLayout.USER,
    icon: FiHome,
    index: true,
    description: 'dashboard.home.description',
    allowedGroups: ALLOW_ALL_USERS,
  },
  {
    name: 'profile',
    element: <UserProfile />,
    layout: RouteLayout.USER,
    path: 'pages/identity',
    description: 'dashboard.create_feedback.description',
    allowedGroups: ALLOW_ALL_USERS,
    hide: true,
  },
  {
    name: 'mentor_only',
    element: <DashboardMentorOnlyPage />,
    layout: RouteLayout.USER,
    path: 'mentor-only',
    icon: FiShield,
    description: 'dashboard.mentor_only.description',
    allowedGroups: MENTOR_ONLY,
  },
  {
    name: 'mentee_only',
    element: <DashboardMenteeOnlyPage />,
    layout: RouteLayout.USER,
    path: 'mentee-only',
    icon: IoSchool,
    description: 'dashboard.mentee_only.description',
    allowedGroups: MENTEE_ONLY,
  },
  {
    name: 'create_feedback',
    element: <CreateFeedbackPage />,
    layout: RouteLayout.USER,
    path: 'feedbacks/create',
    description: 'dashboard.create_feedback.description',
    allowedGroups: ALLOW_ALL_USERS,
    hide: true,
  },
  {
    name: 'view_feedback',
    element: <ViewFeedbackPage />,
    layout: RouteLayout.USER,
    path: 'feedbacks/:id',
    description: 'dashboard.feedback.description',
    allowedGroups: ALLOW_ALL_USERS,
    hide: true,
  },
  {
    name: 'edit_feedback',
    element: <EditFeedbackPage />,
    layout: RouteLayout.USER,
    path: 'feedbacks/:id/edit',
    description: 'dashboard.edit_feedback.description',
    allowedGroups: ALLOW_ALL_USERS,
    hide: true,
  },
  {
    name: 'feedback',
    element: <FeedbackPage />,
    layout: RouteLayout.USER,
    path: 'feedbacks',
    icon: VscFeedback,
    description: 'dashboard.feedback.description',
    allowedGroups: ALLOW_ALL_USERS,
  },
];
