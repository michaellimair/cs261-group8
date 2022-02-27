import { FC } from 'react';
import {
  Text,
  Link,
  Heading,
  VStack,
  StackDivider,
  Flex,
  Spacer,
  Box,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

interface IMeetingCardProps {
  title: string;
  body: string;
  linkToMeeting: string;
}

const AcceptedMeetingCard: FC<IMeetingCardProps> = ({
  title,
  body,
  linkToMeeting,
}) => (
  <Flex align="center" p="4" pl="8" pr="8" boxShadow="lg" m="4" borderRadius="lg" bg="white" divider={<StackDivider borderColor="gray.200" />}>
    <VStack align="left" flex="4">
      <Heading>{title}</Heading>
      <Text fontSize={{ base: 'lg' }} textAlign="left" maxW="4xl">
        {body}
      </Text>
      <Link color="teal.500" href={linkToMeeting} isExternal>
        Link to meeting
        {' '}
        <ExternalLinkIcon mx="2px" />
      </Link>
    </VStack>
    <Spacer flex="0.5" borderRightWidth="2px" borderColor="gray.100" />
    <Box flex="1.5" pl="8">
      <Text fontSize={{ base: '3xl' }} fontWeight="bold" textAlign="center" color="green">
        Accepted
      </Text>
    </Box>
  </Flex>
);

export default AcceptedMeetingCard;
