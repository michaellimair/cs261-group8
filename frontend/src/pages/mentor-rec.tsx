import {
  Button,
  Stack,
  Heading,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';
import MentorList from 'components/Forms/Mentors/MentorList';
import { UserGroup } from 'customTypes/auth';
import { IMentor } from 'customTypes/mentor';
import React, {
  FC, useState,
} from 'react';
import { useTranslation } from 'react-i18next';

const mentorList = [
  {
    id: 1,
    username: 'user',
    email: 'email@email.com',
    first_name: 'First name',
    last_name: 'Last name',
    full_name: 'Full name 4',
    profile: {
      completed: true,
      pronoun: null,
      years_experience: null,
      title: null,
      business_area: null,
      country: 'England',
      timezone: 'Antactica',
      skills: ['skill 1', 'skill 2', 'skill 3'],
      avatar: 'url',
    },
    groups: [{
      id: 1,
      name: UserGroup.MENTOR,
    }],
  },
//   {
//     id: 2,
//     username: 'user',
//     email: 'email@email.com',
//     first_name: 'First name',
//     last_name: 'Last name',
//     full_name: 'Full name 3',
//     profile: {
//       completed: true,
//       pronoun: null,
//       years_experience: null,
//       title: null,
//       business_area: null,
//       country: 'England',
//       timezone: 'Antactica',
//       skills: ['skill 1', 'skill 2', 'skill 3'],
//       avatar: 'url',
//     },
//     groups: [{
//       id: 1,
//       name: UserGroup.MENTOR,
//     }],
//   },
//   {
//     id: 3,
//     username: 'user',
//     email: 'email@email.com',
//     first_name: 'First name',
//     last_name: 'Last name',
//     full_name: 'Full name 2',
//     profile: {
//       completed: true,
//       pronoun: null,
//       years_experience: null,
//       title: null,
//       business_area: {
//         name: 'Business',
//         label: 'Business-label',
//       },
//       country: 'England',
//       timezone: 'Antactica',
//       skills: ['skill 1', 'skill 2', 'skill 3'],
//       avatar: 'url',
//     },
//     groups: [{
//       id: 1,
//       name: UserGroup.MENTOR,
//     }],
//   },
//   {
//     id: 4,
//     username: 'user',
//     email: 'email@email.com',
//     first_name: 'First name',
//     last_name: 'Last name',
//     full_name: 'Full name 1',
//     profile: {
//       completed: true,
//       pronoun: null,
//       years_experience: null,
//       title: null,
//       business_area: null,
//       country: null,
//       timezone: null,
//       skills: null,
//       avatar: null,
//     },
//     groups: [{
//       id: 2,
//       name: UserGroup.MENTOR,
//     }],
//   },
];
const numberOfVotes = 3;

const MentorRec: FC = () => {
  const { t } = useTranslation();
  const [voteStack, setVoteStack] = useState<number[]>([]);
  const [mentors, setMentors] = useState<IMentor[]>(mentorList.map((mentor) => (
    {
      user: mentor,
      vote: 0,
    })));

  const voteMentor = (id: IMentor['user']['id']) => {
    let newStack = voteStack;
    if (voteStack.length < numberOfVotes) {
      newStack = [...voteStack, id];
    } else {
      newStack = [id];
    }

    const newMentors = mentors.map((element) => {
      const queuePos = newStack.indexOf(element.user.id);
      return {
        ...element,
        vote: queuePos + 1,
      };
    });
    setVoteStack(newStack);
    setMentors(newMentors);
  };
  return (
    <>
      <Stack align="center">
        <Heading fontSize="4xl">
          {t('select_mentors')}
        </Heading>
      </Stack>
      <Box
        w="100%"
        alignContent="center"
        rounded="lg"
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow="lg"
        p={8}
      >
        <Button data-testId="submitButton" disabled={voteStack.length < numberOfVotes}>{t('submit_mentors')}</Button>
        <MentorList mentors={mentors} voteMentor={voteMentor} />
      </Box>
    </>
  );
};

export default MentorRec;
