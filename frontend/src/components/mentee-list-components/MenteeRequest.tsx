import {
  Stack, Center, Button, Box,
} from '@chakra-ui/react';
import { FC } from 'react';
import MenteeProfile from './MenteeProfile';

const MenteeRequest: FC = () => (
  <Box m="20px" border="1px" width="fit-content">
    <Stack direction="row" spacing={20} width="800px">
      <MenteeProfile />
      <Center>
        <Stack>
          <Button width="200px" colorScheme="green">Accept</Button>
          <Button width="200px" colorScheme="red">Reject</Button>
        </Stack>
      </Center>
    </Stack>
  </Box>
);

export default MenteeRequest;
