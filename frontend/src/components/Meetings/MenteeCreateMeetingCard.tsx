import {
  StackDivider,
  Flex,
  Box,
  Text,
  HStack,
  VStack,
  Input,
  PinInput,
  PinInputField,
  Select,
  Textarea,
  Button,
  Heading,
  Spacer,
} from '@chakra-ui/react';

const MenteeCreateMeetingCard = () => (
  <Flex verticalAlign="top" align="center" p="4" pl="8" pr="8" boxShadow="lg" m="4" borderRadius="lg" bg="white" divider={<StackDivider borderColor="gray.200" />}>
    {/* <Spacer flex="0.5" borderRightWidth="2px" borderColor="gray.100" /> */}
    <Box flex="1.25">
      <VStack align="left">
        <Heading size="md">Create a new meeting</Heading>
        <HStack>
          <VStack align="left" spacing="4">
            <Text>
              Title:
            </Text>
            <Text>
              Date:
            </Text>
            <Text>
              Time:
            </Text>
          </VStack>
          <VStack align="left">
            <Input placeholder="Meeting title" size="sm" isRequired />
            <HStack>
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
            <HStack>
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
              <Select size="sm" width="200">
                <option value="am">AM</option>
                <option value="pm">PM</option>
              </Select>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </Box>
    <Spacer flex="0.2" />
    <Box flex="3">
      <VStack align="left">
        <Text>
          Meeting description:
        </Text>
        <Textarea
          placeholder="Meeting description"
          resize="none"
          size="sm"
          height="180px"
          isRequired
        />
      </VStack>
    </Box>
    <Box flex="1">
      <VStack align="stretch" pl="8">
        <Button colorScheme="blue" variant="outline">
          Create
        </Button>
      </VStack>
    </Box>
  </Flex>
);

export default MenteeCreateMeetingCard;
