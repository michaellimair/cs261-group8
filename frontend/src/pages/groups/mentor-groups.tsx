import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Center,
  Heading,
  Stack,
} from '@chakra-ui/react';
import MentorPotentialGroupCard from 'components/group-sessions-components/MentorPotentialGroupCard';
import { IGroupCardProps, ITopicProps } from 'customTypes/group';
import MentorAcceptedGroupCard from 'components/group-sessions-components/MentorAcceptedGroupCard';

const dt = new Date('2022-04-02T18:00:00Z');
const acceptedMeetings : IGroupCardProps[] = [
  {
    title: 'Topic',
    body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    isTutoring: false,
    linkToMeeting: '#',
    meetingTime: dt,
    mentor: {
      id: 2,
      username: '',
      email: '',
      first_name: 'string',
      last_name: 'string',
      full_name: 'Full Name',
      profile: {
        completed: false,
        pronoun: null,
        years_experience: null,
        title: null,
        business_area: null,
        country: null,
        timezone: null,
        skills: null,
        avatar: 'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
      },
      groups: [],
    },
  },
];

const proposedTopics : ITopicProps[] = [
  { title: 'Topic' },
];

const MentorGroupPage: FC = () => {
  const { t } = useTranslation();
  return (
    <Stack p="4" spacing="24px">
      <Center>
        <Heading size="2xl">{t('dashboard.group_meetings.title')}</Heading>
      </Center>
      <Heading>{t('dashboard.group_meetings.accepted_meetings')}</Heading>
      {acceptedMeetings.map((topic) => (
        <MentorAcceptedGroupCard
          title={topic.title}
          body={topic.body}
          isTutoring={topic.isTutoring}
          linkToMeeting={topic.linkToMeeting}
          meetingTime={topic.meetingTime}
          mentor={topic.mentor}
        />
      ))}
      <Heading>{t('dashboard.group_meetings.in_demand_topics')}</Heading>
      {proposedTopics.map((topic) => (
        <MentorPotentialGroupCard title={topic.title} />
      ))}
    </Stack>
  );
};

export default MentorGroupPage;
