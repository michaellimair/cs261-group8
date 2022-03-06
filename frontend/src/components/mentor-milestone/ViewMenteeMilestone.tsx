import {
  Stack, Button, Center, Box,
} from '@chakra-ui/react';
import MenteeIcon from 'components/mentee-icon-details/MenteeIcon';
import { FC } from 'react';

const ViewMenteeMilestone: FC = () => (
  <Box m="20px" border="1px" maxW="350px">
    <Stack mr="20px" direction="row">
      <MenteeIcon />
      <Center>
        <Button maxW="200px" colorScheme="blue">See mentee milestones</Button>
      </Center>
    </Stack>
  </Box>
);

export default ViewMenteeMilestone;
