import {
  Stack, Button, Box, Center,
} from '@chakra-ui/react';
import { FC } from 'react';
import MenteeProfile from './MenteeProfile';

const ExistingMentee: FC = () => (
  <Box m="20px" border="1px" width="fit-content">
    <Stack spacing={20} direction="row" width="800px">
      <MenteeProfile />
      <Center>
        <Button width="200px" colorScheme="blue">Milestones</Button>
      </Center>
    </Stack>
  </Box>
);

export default ExistingMentee;
