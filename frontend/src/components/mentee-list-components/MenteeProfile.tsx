import {
  Avatar, Center, Heading, Stack,
} from '@chakra-ui/react';
import { FC } from 'react';

const MenteeProfile: FC = () => (
  <Stack m="20px" spacing={50} direction="row" width="fit-content">
    <Stack m="20px" direction="column" maxW="100px">
      <Center>
        <Avatar size="md" name="Mentee" />
      </Center>
      <Center>
        <Heading size="md">Mentee</Heading>
      </Center>
    </Stack>
    <Stack m="20px" direction="column" maxW="300px">
      <Heading size="md">Business area</Heading>
      <Heading size="sm">List of interests: Frontend, Backend, ML</Heading>
      <Stack m="20px" spacing={6} direction="row">
        <Avatar src="https://thumbs.dreamstime.com/z/globe-grid-vector-icon-isolated-white-background-181317661.jpg" />
        <Stack m="20px" spacing={2} direction="column">
          <Heading size="xs">
            Location: San Fransisco, CA
          </Heading>
          <Heading size="xs">Timezone: 00:00 GMT</Heading>
        </Stack>
      </Stack>
    </Stack>
  </Stack>
);

export default MenteeProfile;
