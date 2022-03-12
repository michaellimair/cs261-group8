import {
  Stack, Button, Center,
} from '@chakra-ui/react';
import MenteeIcon from 'components/mentee-icon-details/MenteeIcon';
import { FC } from 'react';

const ViewMenteeMilestone: FC = () => (
  <Stack
    m="20px"
    rounded="xl"
    boxShadow="lg"
    width="fit-content"
    height="fit-content"
    border="1px"
  >
    <Stack mr="20px" direction="row">
      <MenteeIcon />
      <Center>
        <Button maxW="200px" colorScheme="blue">See mentee milestones</Button>
      </Center>
    </Stack>
  </Stack>
);

export default ViewMenteeMilestone;
