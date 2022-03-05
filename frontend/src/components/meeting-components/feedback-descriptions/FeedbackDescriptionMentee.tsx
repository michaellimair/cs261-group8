import {
  Box, Stack, Center, Button, Input, Heading,
} from '@chakra-ui/react';
import MentorRating from 'components/feedback-buttons/MentorRating';
import { FC } from 'react';

const FeedbackDescriptionMentee: FC = () => (
  <Box m="50px" border="1px" width="fit-content">
    <Stack m="10px" width="300px">
      <Stack m="10px" direction="row" spacing={3}>
        <Heading m="5px" size="md">Rating:</Heading>
        <MentorRating />
        <Center>
          <Button colorScheme="blue">Submit</Button>
        </Center>
      </Stack>
      <Center>
        <Input m="15px" maxW="250px" placeholder="Write feedback" />
      </Center>
    </Stack>
  </Box>
);

export default FeedbackDescriptionMentee;
