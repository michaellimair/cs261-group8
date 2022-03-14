import { IUser } from './auth';

export interface IGroupCardProps {
  title: string;
  body: string;
  isTutoring: boolean;
  linkToMeeting: string;
  meetingTime: Date;
  mentor: IUser;
}

export interface ITopicProps {
  title: string;
  count: number;
  refetch: () => void;
}
