import {
  Box, Button, Center, Heading, Input, Stack,
} from '@chakra-ui/react';
import { FC } from 'react';

const CreateMeeting: FC = () => (
  <Box m="20px" width="fit-content" height="fit-content">
    <Box width="300px" bgColor="purple" color="white">
      <Center><Heading m="5px" size="md">Create meeting</Heading></Center>
    </Box>
    <Box width="600px" border="1px">
      <Stack m="20px" spacing={20} direction="row" width="fit-content">
        <Stack width="fit-content">
          <Heading size="sm">Title</Heading>
          <Input className="meeting-title" type="text" placeholder="title" />
          <Heading size="sm">Date</Heading>
          <Input className="meeting-date" type="date" placeholder="date" />
          <Heading size="sm">Time</Heading>
          <Input className="meeting-time" type="time" placeholder="time" />
        </Stack>
        <Stack spacing={3}>
          <Heading m="5px" size="sm">Description</Heading>
          <Input className="meeting-description" size="lg" />
          <Button colorScheme="blue" bottom="0">Create</Button>
        </Stack>
      </Stack>
    </Box>
  </Box>
);

export default CreateMeeting;
