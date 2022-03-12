import {
  Accordion,
  Button,
  Flex,
  Heading, HStack, Progress, Stack,
} from '@chakra-ui/react';
import PlanOfAction from 'components/PlanOfAction/shared-components/PlanOfAction';
import { FC } from 'react';
import MentorComment from './MentorComment';

const MenteeMilestoneCard: FC = () => (
  <Flex align="center" p="4" pl="8" pr="8" boxShadow="lg" m="4" borderRadius="lg" bg="white" width="fit-content" height="fit-content">
    <Stack>
      <HStack spacing={6}>
        <Heading size="md">Milestone</Heading>
        <Progress width="400px" height="30px" colorScheme="red" value={10} />
      </HStack>
      <Stack>
        <HStack m="20px" mt="40px" spacing={6} style={{ alignItems: 'end' }}>
          <Accordion allowMultiple>
            <PlanOfAction />
            <PlanOfAction />
          </Accordion>
          <Button id="add-btn" colorScheme="green">+</Button>
          <Button id="remove-btn" colorScheme="red">-</Button>
        </HStack>
        <MentorComment />
      </Stack>
    </Stack>
  </Flex>

);

export default MenteeMilestoneCard;
