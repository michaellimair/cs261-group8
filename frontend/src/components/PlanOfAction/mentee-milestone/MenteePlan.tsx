import {
  Accordion,
  Box,
  Button,
  Heading, Progress, Stack,
} from '@chakra-ui/react';
import PlanOfAction from 'components/PlanOfAction/shared-components/Milestone';
import { FC } from 'react';
import MentorComment from './MentorComment';

const MenteePlan: FC = () => (
  <Stack
    m="20px"
    rounded="xl"
    boxShadow="lg"
    width="fit-content"
    height="fit-content"
  >
    <Box width="fit-content" height="fit-content">
      <Stack m="20px" spacing={6} direction="row">
        <Box>
          <Heading size="md">Milestone</Heading>
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
  </Stack>
);

export default MenteePlan;
