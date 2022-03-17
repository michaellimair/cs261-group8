import { UserGroup } from 'customTypes/auth';
import DashboardHomePage from 'pages/dashboard/dashboard';
import FeedbackPage from 'pages/feedback';
import LoginPage from 'pages/login';
import RegisterPage from 'pages/register';
import WelcomeForm from 'pages/welcome';
import MentorRecomendationsPage from 'pages/mentor-recommendations';
import MenteeMeetingsPage from 'pages/dashboard/mentee-meetings';
import MentorMeetingsPage from 'pages/dashboard/mentor-meetings';
import { ReactElement } from 'react';
import { IconType } from 'react-icons';
import {
  FiHome,
} from 'react-icons/fi';
import { FaAddressCard, FaCalendar, FaUserCircle } from 'react-icons/fa';
import { VscFeedback } from 'react-icons/vsc';
import { IoSchool } from 'react-icons/io5';
import { HiOutlineClipboardList, HiUserGroup } from 'react-icons/hi';
import { MdComputer } from 'react-icons/md';
import { TiGroupOutline } from 'react-icons/ti';
import CreateFeedbackPage from 'pages/feedback/create';
import ViewFeedbackPage from 'pages/feedback/[id]';
import EditFeedbackPage from 'pages/feedback/[id]/edit';
import MenteeMilestonePage from 'pages/mentee-dashboard/MenteeMilestonePage';
import UserProfile from 'pages/identity/UserProfile';
import MenteeGroupPage from 'pages/groups/mentee-groups';
import MentorGroupPage from 'pages/groups/mentor-groups';
import MyCalendarPage from 'pages/my-calendar';
import UserChangePassword from 'components/user-profile-components/UserChangePassword';
import MyMentorPage from 'pages/my-mentor';
import { IMatchStatus } from 'customTypes/matching';
import MentorMatchRequestsPage from 'pages/mentor-match-requests';

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

export interface IWelcomeDashboardRoute extends IDashboardRoute {
  /** Require that a user completed their profile for the route to be shown. */
  requireCompleted: boolean;
}

const UNDECLARED_ONLY: UserGroup[] = [UserGroup.UNDECLARED];
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

export const welcomeRoutes: IWelcomeDashboardRoute[] = [
  {
    name: 'welcome',
    element: <WelcomeForm />,
    layout: RouteLayout.USER,
    index: true,
    requireCompleted: false,
    icon: HiOutlineClipboardList,
    description: 'dashboard.welcome.description',
    allowedGroups: UNDECLARED_ONLY,
  },
];

export interface IMenteeDashboardRoute extends IDashboardRoute {
  requiredMatchStatus: IMatchStatus | null;
}

export const isMenteeDashboardRoute = (route: IDashboardRoute): route is IMenteeDashboardRoute => 'requiredMatchStatus' in route;

export const dashboardRoutes: (IDashboardRoute | IMenteeDashboardRoute)[] = [
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
    name: 'mentor_recommendations',
    element: <MentorRecomendationsPage />,
    layout: RouteLayout.USER,
    icon: HiUserGroup,
    path: 'mentor-recommendations',
    description: 'dashboard.mentor_recommendations.description',
    requiredMatchStatus: IMatchStatus.REJECTED,
    allowedGroups: MENTEE_ONLY,
  },
  {
    name: 'mentee_meetings',
    element: <MenteeMeetingsPage />,
    layout: RouteLayout.USER,
    path: 'mentee-meetings',
    icon: MdComputer,
    description: 'dashboard.mentee_meetings.description',
    allowedGroups: MENTEE_ONLY,
    requiredMatchStatus: IMatchStatus.ACCEPTED,
  },
  {
    name: 'mentor_match_requests',
    element: <MentorMatchRequestsPage />,
    layout: RouteLayout.USER,
    icon: HiUserGroup,
    path: 'mentor-recommendations',
    description: 'dashboard.mentor_match_requests.description',
    allowedGroups: MENTOR_ONLY,
  },
  {
    name: 'mentor_meetings',
    element: <MentorMeetingsPage />,
    layout: RouteLayout.USER,
    icon: MdComputer,
    path: 'mentor-meetings',
    description: 'dashboard.mentor_meetings.description',
    allowedGroups: MENTOR_ONLY,
  },
  {
    name: 'group_meetings',
    element: <MenteeGroupPage />,
    layout: RouteLayout.USER,
    path: 'mentee-groups',
    icon: TiGroupOutline,
    description: 'dashboard.group_meetings.description',
    allowedGroups: MENTEE_ONLY,
    requiredMatchStatus: IMatchStatus.ACCEPTED,
  },
  {
    name: 'group_meetings_mentor',
    element: <MentorGroupPage />,
    layout: RouteLayout.USER,
    path: 'mentor-groups',
    icon: TiGroupOutline,
    description: 'dashboard.group_meetings.description',
    allowedGroups: MENTOR_ONLY,
  },
  {
    name: 'mentee_milestones',
    element: <MenteeMilestonePage />,
    layout: RouteLayout.USER,
    path: 'mentee-milestones',
    icon: IoSchool,
    description: 'dashboard.mentee_milestones.description',
    allowedGroups: MENTEE_ONLY,
    requiredMatchStatus: IMatchStatus.ACCEPTED,
  },
  {
    name: 'my_mentor',
    element: <MyMentorPage />,
    layout: RouteLayout.USER,
    path: 'my-mentor',
    icon: FaAddressCard,
    description: 'dashboard.my_mentor.description',
    allowedGroups: MENTEE_ONLY,
  },
  {
    name: 'my_calendar',
    element: <MyCalendarPage />,
    layout: RouteLayout.USER,
    path: 'my-calendar',
    icon: FaCalendar,
    description: 'dashboard.my_calendar.description',
    allowedGroups: ALLOW_ALL_USERS,
  },
  {
    name: 'profile',
    element: <UserProfile />,
    layout: RouteLayout.USER,
    path: 'profile',
    hide: true,
    icon: FaUserCircle,
    description: 'dashboard.profile.description',
    allowedGroups: ALLOW_ALL_USERS,
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
  {
    name: 'change-password',
    element: <UserChangePassword />,
    layout: RouteLayout.USER,
    path: 'profile/change-password',
    hide: true,
    description: 'dashboard.change-password.description',
    allowedGroups: ALLOW_ALL_USERS,
  },
];
