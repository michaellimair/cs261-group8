import {
  Avatar, Heading, Box, Stack,
} from '@chakra-ui/react';
import { FC } from 'react';

const MenteeIcon: FC = () => (
  <Stack m="20px" direction="column" align="center">
    <Avatar size="md" name="Mentee 1" src="https://bit.ly/broken-link" />
    <Box>
      <Heading size="md">Mentee</Heading>
    </Box>
  </Stack>
);

export default MenteeIcon;
