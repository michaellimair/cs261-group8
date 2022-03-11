import {
  Box, Stack, Heading, Textarea, Input, Flex,
} from '@chakra-ui/react';
import { FC } from 'react';

const CreatePlan: FC = () => (
  <Flex>
    <Stack
      direction="column"
      m="20px"
      width="fit-content"
      rounded="xl"
      boxShadow="lg"
    >
      <Box m="20px">
        <Heading m="20px">Create new plan of action</Heading>
        <Box m="20px" width="800px">
          <Stack direction="column" spacing={5}>
            <Heading size="md">Plan title</Heading>
            <Input placeholder="plan-title" />
            <Heading size="md">Description</Heading>
            <Textarea />
          </Stack>
        </Box>
      </Box>
    </Stack>
  </Flex>
);

export default CreatePlan;
