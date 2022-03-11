import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Center,
  Heading,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { IGroupCardProps } from 'customTypes/group';
import ProposeGroupSession from 'components/group-sessions-components/ProposeGroupSession';
import MenteeAvailableGroupCard from 'components/group-sessions-components/MenteeAvailableGroupCard';

const dt = new Date('2022-04-02T18:00:00Z');
const groups : IGroupCardProps[] = [
  {
    title: 'Topic',
    body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    isTutoring: false,
    linkToMeeting: '#',
    meetingTime: dt,
  },
];

const MenteeGroupPage: FC = () => {
  const { t } = useTranslation();
  const [isShow, setIsShow] = React.useState(false);
  const handleClick = useCallback(() => {
    setIsShow((show) => !show);
  }, []);

  return (
    <Stack p="4" spacing="24px">
      <Center>
        <Heading size="2xl">{t('dashboard.group_sessions.title')}</Heading>
      </Center>
      <VStack spacing="0" align="stretch">
        <Button colorScheme="blue" size="lg" borderBottomRadius={isShow ? ('0') : 'lg'} onClick={handleClick}>
          {t('dashboard.group_sessions.propose_group')}
          {' '}
          {isShow ? (<ChevronDownIcon />) : (<ChevronRightIcon />)}
        </Button>
        {isShow && <ProposeGroupSession />}
      </VStack>
      <Heading>{t('dashboard.group_sessions.available_groups')}</Heading>
      {groups.map((group) => (
        <MenteeAvailableGroupCard
          title={group.title}
          body={group.body}
          isTutoring={group.isTutoring}
          linkToMeeting={group.linkToMeeting}
          meetingTime={group.meetingTime}
        />
      ))}
    </Stack>
  );
};

export default MenteeGroupPage;
