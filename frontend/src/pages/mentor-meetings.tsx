import React, {
  FC,
} from 'react';
import CompletedMeetingCard from 'components/Meetings/CompletedMeetingCard';
import NewMeetingRequestCard from 'components/Meetings/NewMeetingRequestCard';
import AcceptedMeetingCard from 'components/Meetings/AcceptedMeetingCard';
import {
  Center,
  Heading,
  Stack,
} from '@chakra-ui/react';

const MentorMeetingsPage: FC = () => (
  <Stack p="4" spacing="24px">
    <Center>
      <Heading size="2xl">Mentor Dashboard</Heading>
    </Center>
    {/* TODO: get rid of the text and replace with stuff from the database */}
    <Heading>Feedback Required</Heading>
    <CompletedMeetingCard
      title="Topic"
      body="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
      linkToMeeting="#"
    />
    <Heading>New Meeting Requests</Heading>
    <NewMeetingRequestCard
      title="Topic"
      body="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
      linkToMeeting="#"
    />
    <Heading>Accepted Meetings</Heading>
    <AcceptedMeetingCard
      title="Topic"
      body="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
      linkToMeeting="#"
    />
  </Stack>

);

export default MentorMeetingsPage;
