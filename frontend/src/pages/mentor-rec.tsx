import {
  Text,
  HStack,
  VStack,
  Button,
  Stack,
  Heading,
  useColorModeValue,
  Avatar,
  Box,
} from '@chakra-ui/react';
import MentorList from 'components/Forms/Mentors/MentorList';
import { IMentor } from 'customTypes/mentor';
import { identity } from 'lodash';
import React, {
  FC, useState,
} from 'react';
import { useTranslation } from 'react-i18next';

const mentorList = [
  {
    id: 1,
    name: 'Name 1',
    business_area: 'BusinessArea',
    specialities: ['speciality1', 'speciality2'],
    location: 'location',
    timezone: 'timezone',
    vote: 0,
  },
  {
    id: 2,
    name: 'Name 2',
    business_area: 'BusinessArea',
    specialities: ['speciality1', 'speciality2'],
    location: 'location',
    timezone: 'timezone',
    vote: 0,
  },
  {
    id: 3,
    name: 'Name 3',
    business_area: 'BusinessArea',
    specialities: ['speciality1', 'speciality2'],
    location: 'location',
    timezone: 'timezone',
    vote: 0,
  },
  {
    id: 4,
    name: 'Name 4',
    business_area: 'BusinessArea',
    specialities: ['speciality1', 'speciality2'],
    location: 'location',
    timezone: 'timezone',
    vote: 0,
  },
  {
    id: 5,
    name: 'Name 5',
    business_area: 'BusinessArea',
    specialities: ['speciality1', 'speciality2'],
    location: 'location',
    timezone: 'timezone',
    vote: 0,
  },
];
const numberOfVotes = 3;

const MentorRec: FC = () => {
  const { t } = useTranslation();
  const [voteStack, setVoteStack] = useState<number[]>([]);
  const [mentors, setMentors] = useState<IMentor[]>(mentorList);

  const voteMentor = (id: IMentor['id']) => {
    let newStack = voteStack;
    if (voteStack.length < numberOfVotes) {
      newStack = [...voteStack, id];
    } else {
      newStack = [id];
    }

    const newMentors = mentors.map((element) => {
      const queuePos = newStack.indexOf(element.id);
      return {
        ...element,
        vote: queuePos + 1,
      };
      return element;
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
        align="center"
        rounded="lg"
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow="lg"
        p={8}
      >
        <Button disabled={voteStack.length < numberOfVotes}>{t('submit_mentors')}</Button>
        <MentorList mentors={mentors} voteMentor={voteMentor} />

      </Box>
    </>
  );
};

export default MentorRec;
