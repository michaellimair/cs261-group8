import {
  Box, Button, Center, Heading, Input, Stack,
} from '@chakra-ui/react';
import { FC } from 'react';

const CreateMilestone: FC = () => (
  <Box m="20px" maxWidth="300px">
    <Box m="10px" backgroundColor="purple" color="white">
      <Center><Heading size="md">Create new milestone</Heading></Center>
    </Box>
    <Box border="1px">
      <Stack m="20px">
        <Box>
          <Heading size="sm">Title</Heading>
          <Center>
            <Input p="10px" />
            <Button m="5px" size="sm" maxW="100px" colorScheme="blue">Create</Button>
          </Center>
        </Box>
      </Stack>
    </Box>
  </Box>
);

export default CreateMilestone;
