import {
  HStack,
  VStack,
  Stack,
  Text,
  Avatar,
  Heading,
  Center,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { IMentor } from 'customTypes/mentor';

interface IMentorListProps {
  mentors: IMentor[];
  voteMentor: (id: IMentor['user']['id']) => void;
}

const MentorList: FC<IMentorListProps> = ({ mentors, voteMentor }) => (
  !mentors.length
    ? (
      <Text>
        No mentors to show
      </Text>
    ) : (
      <Stack>
        {mentors.map((mentor: IMentor) => (
          <Stack
            w="100%"
            rounded="lg"
            bg="white"
            boxShadow="lg"
            p={4}
          >
            <HStack spacing="3px">
              <VStack w="15%" align="right">
                <Avatar size="xl" />
              </VStack>
              <VStack w="70%" align="left" spacing="5px">
                <Heading size="md" alignContent="left">{mentor.user.full_name}</Heading>
                <Heading size="md" alignContent="left">{mentor.user.profile.business_area?.label}</Heading>
                <Text align="left">{mentor.user.profile.skills?.join(', ')}</Text>
                <Text align="left">{mentor.user.profile.country}</Text>
                <Text align="left">{mentor.user.profile.timezone}</Text>
              </VStack>
              <Center
                w="25px"
                h="25px"
                rounded="lg"
                border="5px"
                borderColor="gray.700"
                bgColor={mentor.vote === 0 ? 'gray.500' : 'turquoise'}
                boxShadow="md"
                p={10}
                onClick={() => voteMentor(mentor.user.id)}
              >
                <Text color="white" fontSize="6xl">{mentor.vote === 0 ? '' : mentor.vote}</Text>
              </Center>
            </HStack>
          </Stack>
        ))}
      </Stack>
    )
);
export default MentorList;
