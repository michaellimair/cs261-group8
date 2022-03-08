import {
  StackDivider,
  Flex,
  Box,
  Text,
  HStack,
  VStack,
  Input,
  Textarea,
  Button,
  Heading,
  Spacer,
} from '@chakra-ui/react';

const CreateMeetingCard = () => (
  <Flex
    verticalAlign="top"
    align="center"
    p="4"
    pl="8"
    pr="8"
    boxShadow="lg"
    m="4"
    borderBottomRadius="lg"
    borderTopRadius="0"
    bg="white"
    divider={<StackDivider borderColor="gray.200" />}
  >
    <Box flex="1.25">
      <VStack align="left">
        <Heading size="md">Create a new meeting</Heading>
        <HStack>
          <VStack align="left" spacing="4">
            <Text>Title:</Text>
            <Text>Date:</Text>
            <Text>Time:</Text>
          </VStack>
          <VStack align="left">
            <Input placeholder="Meeting title" size="sm" type="text" id="title" />
            <Input size="sm" type="date" id="date" />
            <Input size="sm" type="time" id="time" />
          </VStack>
        </HStack>
      </VStack>
    </Box>
    <Spacer flex="0.2" />
    <Box flex="3">
      <VStack align="left">
        <Text>Description</Text>
        <Textarea
          placeholder="Meeting description"
          resize="none"
          size="sm"
          height="180px"
          id="description"
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

export default CreateMeetingCard;
