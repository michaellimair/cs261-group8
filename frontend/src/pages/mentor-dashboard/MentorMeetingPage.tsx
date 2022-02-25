import {
  Box, Heading, Stack,
} from '@chakra-ui/react';
import { FC } from 'react';
import UpcomingMeeting from 'components/meeting-components/meeting-pages/UpcomingMeeting';
import PastMeeting from '../../components/meeting-components/meeting-pages/PastMeeting';
import FeedbackDescriptionMentor from '../../components/meeting-components/feedback-descriptions/FeedbackDescriptionMentor';
import RequestedMeeting from '../../components/meeting-components/meeting-pages/RequestedMeeting';

const MentorMeetingPage: FC = () => (
  <>
    <Box m="20px" width="fit-content">
      <Heading m="20px" size="lg">Past meetings</Heading>
      <Stack direction={['column', 'row']}>
        <Box className="past-meeting" border="1px">
          <PastMeeting />
        </Box>
        <FeedbackDescriptionMentor />
      </Stack>
    </Box>
    <Box m="20px" width="fit-content">
      <Heading m="20px" size="lg">Requested meetings</Heading>
      <Box className="requested-meeting" border="1px">
        <RequestedMeeting />
      </Box>
    </Box>
    <Box m="20px" width="fit-content">
      <Heading m="20px" size="lg">Upcoming meetings</Heading>
      <Box className="upcoming-meeting" border="1px">
        <UpcomingMeeting />
      </Box>
    </Box>
  </>
);

export default MentorMeetingPage;
