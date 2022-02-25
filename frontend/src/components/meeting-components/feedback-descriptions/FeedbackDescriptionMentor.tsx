import {
  Box, Stack, Center, Button, Input,
} from '@chakra-ui/react';
import { FC } from 'react';

const FeedbackDescriptionMentor: FC = () => (
  <Box m="50px" border="1px" width="fit-content">
    <Stack m="10px" width="300px">
      <Center>
        <Button colorScheme="blue">Submit</Button>
      </Center>
      <Center>
        <Input m="15px" maxW="250px" placeholder="Add feedback" />
      </Center>
    </Stack>
  </Box>
);

export default FeedbackDescriptionMentor;
