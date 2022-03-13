import {
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Checkbox,
} from '@chakra-ui/react';
import { IMilestone } from 'customTypes/plan-of-action';
import React, { FC } from 'react';

interface IMilestoneRowProps {
  milestone: IMilestone;
}

const MilestoneRow: FC<IMilestoneRowProps> = ({
  milestone: {
    title, description, completed,
  },
}) => (
  <Box>
    <AccordionItem width="500px">
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {title}
            {' '}
            <Checkbox
              colorScheme="green"
              isChecked={completed}
            />
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {description}
      </AccordionPanel>
    </AccordionItem>
  </Box>
);

export default MilestoneRow;
