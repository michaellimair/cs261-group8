import React, {
  FC,
} from 'react';
import MentorCompletedMeetingCard from 'components/Meetings/MentorCompletedMeetingCard';
import NewMeetingRequestCard from 'components/Meetings/NewMeetingRequestCard';
import AcceptedMeetingCard from 'components/Meetings/AcceptedMeetingCard';
import {
  Center,
  Heading,
  Stack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const dt = new Date('2022-04-02T18:00:00Z');

const MentorMeetingsPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Stack p="4" spacing="24px">
      <Center>
        <Heading size="2xl">{t('mentor_dashboard')}</Heading>
      </Center>
      {/* TODO: get rid of the text and replace with stuff from the backend */}
      <Heading>{t('feedback_required')}</Heading>
      <MentorCompletedMeetingCard
        title="Topic"
        body="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
        linkToMeeting="#"
        meetingTime={dt}
      />
      <Heading>{t('meetings.new_requests')}</Heading>
      <NewMeetingRequestCard
        title="Topic"
        body="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
        linkToMeeting="#"
        meetingTime={dt}
      />
      <Heading>{t('meetings.accepted')}</Heading>
      <AcceptedMeetingCard
        title="Topic"
        body="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
        linkToMeeting="#"
        meetingTime={dt}
      />
    </Stack>

  );
};

export default MentorMeetingsPage;
