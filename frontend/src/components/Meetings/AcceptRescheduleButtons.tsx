import {
  VStack,
  Button,
  Text,
  HStack,
  PinInput,
  PinInputField,
  Select,
} from '@chakra-ui/react';
import React from 'react';

const AcceptRescheduleButtons = () => (
  <VStack align="stretch" pl="8">
    <Button colorScheme="green">Accept</Button>
    <Button colorScheme="red">
      Reschedule
    </Button>
    <HStack spacing="1">
      <VStack align="left" spacing="3">
        <Text>
          Date:
        </Text>
        <Text>
          Time:
        </Text>
      </VStack>
      <VStack align="left">
        <HStack spacing="0.5">
          <PinInput placeholder="D" size="sm">
            <PinInputField isRequired />
            <PinInputField isRequired />
          </PinInput>
          <Text>
            /
          </Text>
          <PinInput placeholder="M" size="sm">
            <PinInputField isRequired />
            <PinInputField isRequired />
          </PinInput>
          <Text>
            /
          </Text>
          <PinInput placeholder="Y" size="sm">
            <PinInputField isRequired />
            <PinInputField isRequired />
          </PinInput>
        </HStack>
        <HStack spacing="0.5">
          <PinInput placeholder="H" size="sm">
            <PinInputField isRequired />
            <PinInputField isRequired />
          </PinInput>
          <Text>
            :
          </Text>
          <PinInput placeholder="M" size="sm">
            <PinInputField isRequired />
            <PinInputField isRequired />
          </PinInput>
          <Select size="sm" width="180">
            <option value="am">AM</option>
            <option value="pm">PM</option>
          </Select>
        </HStack>
      </VStack>
    </HStack>
  </VStack>
);
export default AcceptRescheduleButtons;
