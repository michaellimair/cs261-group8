import { Box, Heading, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import ExistingMentee from '../../components/mentee-list-components/ExistingMentee';
import MenteeRequest from '../../components/mentee-list-components/MenteeRequest';

const MenteeList: FC = () => (
  <Box width="fit-content" height="fit-content">
    <Heading m="20px">Mentee requests</Heading>
    <Stack>
      <MenteeRequest />
    </Stack>
    <Heading m="20px">Mentees</Heading>
    <Stack>
      <ExistingMentee />
    </Stack>
  </Box>
);

export default MenteeList;
