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
  voteMentor: (id: IMentor['id']) => void;
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
                <Heading size="md" align="left">{mentor.name}</Heading>
                <Heading size="md" align="left">{mentor.business_area}</Heading>
                <Text align="left">{mentor.specialities.join(', ')}</Text>
                <Text align="left">{mentor.location}</Text>
                <Text align="left">{mentor.timezone}</Text>
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
                onClick={() => voteMentor(mentor.id)}
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
