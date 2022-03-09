import React, {
  FC, useCallback,
} from 'react';
import MenteeCompletedMeetingCard from 'components/Meetings/MenteeCompletedMeetingCard';
import NewMeetingRequestCard from 'components/Meetings/NewMeetingRequestCard';
import NewMeetingSentCard from 'components/Meetings/NewMeetingSentCard';
import AcceptedMeetingCard from 'components/Meetings/AcceptedMeetingCard';
import CreateMeetingCard from 'components/Meetings/CreateMeetingCard';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Button,
  Center,
  Heading,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const dt = new Date('2022-04-02T18:00:00Z');

const MenteeMeetingsPage: FC = () => {
  const { t } = useTranslation();
  const [isShow, setIsShow] = React.useState(false);
  const handleClick = useCallback(() => {
    setIsShow((show) => !show);
  }, []);

  return (
    <Stack p="4" spacing="24px">
      <Center>
        <Heading size="2xl">{t('mentee_dashboard')}</Heading>
      </Center>
      <VStack spacing="0" align="stretch">
        <Button colorScheme="blue" size="lg" borderBottomRadius={isShow ? ('0') : 'lg'} onClick={handleClick}>
          {t('create_meeting')}
          {' '}
          {isShow ? (<ChevronDownIcon />) : (<ChevronRightIcon />)}
        </Button>
        {isShow && <CreateMeetingCard />}
      </VStack>
      {/* TODO: get rid of the text and replace with stuff from the backend */}
      <Heading>{t('feedback_required')}</Heading>
      <MenteeCompletedMeetingCard
        title="Topic"
        body="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
        linkToMeeting="#"
        meetingTime={dt}
      />
      <Heading>{t('meetings.requested')}</Heading>
      <NewMeetingSentCard
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

export default MenteeMeetingsPage;
