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

const groups : IGroupCardProps[] = [
  {
    title: 'Topic',
    body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    isTutoring: false,
    linkToMeeting: '#',
    meetingTime: new Date('2022-04-02T12:00:00Z'),
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
        languages: [],
        timezone: 'Asia/Hong_Kong',
        skills: null,
        interests: null,
        avatar: 'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
      },
      groups: [],
    },
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
        <Heading size="2xl">{t('dashboard.group_meetings.title')}</Heading>
      </Center>
      <VStack spacing="0" align="stretch">
        <Button colorScheme="blue" size="lg" borderBottomRadius={isShow ? ('0') : 'lg'} onClick={handleClick}>
          {t('dashboard.group_meetings.propose_group')}
          {' '}
          {isShow ? (<ChevronDownIcon />) : (<ChevronRightIcon />)}
        </Button>
        {isShow && <ProposeGroupSession />}
      </VStack>
      <Heading>{t('dashboard.group_meetings.available_groups')}</Heading>
      {groups.map((group) => (
        <MenteeAvailableGroupCard
          title={group.title}
          body={group.body}
          isTutoring={group.isTutoring}
          linkToMeeting={group.linkToMeeting}
          meetingTime={group.meetingTime}
          mentor={group.mentor}
        />
      ))}
    </Stack>
  );
};

export default MenteeGroupPage;
