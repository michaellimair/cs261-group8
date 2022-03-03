import {
  Stack, HStack, Box, Heading, Flex,
} from '@chakra-ui/react';
import { FC } from 'react';

const MeetingDetails: FC = () => (
  <Stack spacing={6} direction={['column', 'column']}>
    <HStack spacing="300px">
      <Box>
        <Heading size="md">Topic</Heading>
        <p>Description</p>
      </Box>
      <Box borderStyle="solid" borderColor="black">
        <Heading size="lg">14:00</Heading>
        <p><i>22nd Feb 2022</i></p>
      </Box>
    </HStack>
    <Flex>
      <Box>
        <Heading size="sm" color="blue"><u><a href="https://chakra-ui.com/docs/navigation/link">Link to meeting</a></u></Heading>
      </Box>
    </Flex>
  </Stack>
);

export default MeetingDetails;
