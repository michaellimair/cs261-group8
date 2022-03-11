import {
  AccordionItem, AccordionButton, Box, AccordionPanel, AccordionIcon, Checkbox,
} from '@chakra-ui/react';
import { FC } from 'react';

const PlanOfAction: FC = () => (
  <AccordionItem width="500px">
    <h2>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          Plan of Action
          {' '}
          <Checkbox colorScheme="green" />
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </AccordionPanel>
  </AccordionItem>
);

export default PlanOfAction;
