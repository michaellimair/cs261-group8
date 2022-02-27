import React, {
  FC,
} from 'react';
import NewMeetingRequestCard from 'components/Meetings/NewMeetingRequestCard';
import { Center, Heading, Stack } from '@chakra-ui/react';

const MentorMeetingsPage: FC = () => (
  <Stack p="4" spacing="24px">
    <Center>
      <Heading size="2xl">Mentor Dashboard</Heading>
    </Center>
    <NewMeetingRequestCard
      title="Topic"
      body="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
      linkToMeeting="#"
    />
    <NewMeetingRequestCard
      title="Topic"
      body="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
      linkToMeeting="#"
    />
  </Stack>

);

export default MentorMeetingsPage;
