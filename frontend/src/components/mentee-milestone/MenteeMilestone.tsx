import {
  Accordion,
  Box,
  Button,
  Heading, Progress, Stack,
} from '@chakra-ui/react';
import PlanOfAction from 'components/shared-components/PlanOfAction';
import { FC } from 'react';
import MentorComment from './MentorComment';

const MenteeMilestone: FC = () => (
  <Box m="20px" border="1px" width="fit-content" height="fit-content">
    <Box width="fit-content" height="fit-content">
      <Stack m="20px" spacing={6} direction="row">
        <Box>
          <Heading size="md">Milestone 1</Heading>
        </Box>
        <Progress width="400px" height="30px" colorScheme="red" value={10} />
      </Stack>
      <Stack m="20px" mt="40px" spacing={6} style={{ alignItems: 'end' }} direction="row" width="fit-content" height="fit-content">
        <Accordion allowMultiple>
          <PlanOfAction />
          <PlanOfAction />
        </Accordion>
        <Box id="add-btn" bottom="0px">
          <Button colorScheme="green">+</Button>
        </Box>
        <Box id="remove-btn" bottom="0px">
          <Button colorScheme="red">-</Button>
        </Box>
      </Stack>
      <MentorComment />
    </Box>
  </Box>
);

export default MenteeMilestone;
