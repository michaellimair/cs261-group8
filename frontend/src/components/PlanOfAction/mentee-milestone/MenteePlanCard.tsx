import {
  Accordion,
  Button,
  Flex,
  Heading, HStack, Progress, Stack,
} from '@chakra-ui/react';
import Milestone from 'components/PlanOfAction/shared-components/Milestone';
import React, { FC, useCallback } from 'react';
import MentorComment from './MentorComment';

const MenteePlanCard: FC = () => {
  const [value, setValue] = React.useState(0);
  const handlePlusClick = useCallback(() => {
    setValue(value >= 90 ? 100 : value + 10);
  }, [value]);
  const handleMinusClick = useCallback(() => {
    setValue(value <= 10 ? 0 : value - 10);
  }, [value]);

  return (
    <Flex align="center" p="4" pl="8" pr="8" boxShadow="lg" m="4" borderRadius="lg" bg="white" width="fit-content" height="fit-content">
      <Stack>
        <HStack spacing={6}>
          <Heading size="md">Plan of Action</Heading>
          <Progress width="400px" height="30px" colorScheme="red" value={value} />
        </HStack>
        <Stack>
          <HStack m="20px" mt="40px" spacing={6} style={{ alignItems: 'end' }}>
            <Accordion allowMultiple>
              <Milestone />
              <Milestone />
            </Accordion>
            <Button id="add-btn" colorScheme="green" onClick={handlePlusClick}>+</Button>
            <Button id="remove-btn" colorScheme="red" onClick={handleMinusClick}>-</Button>
          </HStack>
          <MentorComment />
        </Stack>
      </Stack>
    </Flex>

  );
};

export default MenteePlanCard;
