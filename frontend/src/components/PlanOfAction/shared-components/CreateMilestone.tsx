import {
  Box, Button, Center, Heading, Input, Stack,
} from '@chakra-ui/react';
import { FC } from 'react';

const CreateMilestone: FC = () => (
  <Stack
    m="20px"
    rounded="xl"
    boxShadow="lg"
    width="fit-content"
    height="fit-content"
  >
    <Box
      m="20px"
      rounded="xl"
      boxShadow="lg"
      backgroundColor="purple"
      color="white"
      width="500px"
    >
      <Center><Heading size="md">Create new plan of action</Heading></Center>
    </Box>
    <Box
      m="20px"
    >
      <Stack m="20px">
        <Box>
          <Heading size="sm">Title</Heading>
          <Center>
            <Input p="10px" width="400px" />
            <Button m="5px" size="sm" width="100px" colorScheme="blue">Create</Button>
          </Center>
        </Box>
      </Stack>
    </Box>
  </Stack>
);

export default CreateMilestone;
