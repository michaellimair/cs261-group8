import { FC } from 'react';
import {
  Text,
  Link,
  Heading,
  VStack,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

interface IMeetingCardInfoProps {
  title: string;
  body: string;
  linkToMeeting: string;
}

const MeetingCardInfo: FC<IMeetingCardInfoProps> = ({
  title,
  body,
  linkToMeeting,
}) => (
  <VStack align="left">
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
);

export default MeetingCardInfo;
