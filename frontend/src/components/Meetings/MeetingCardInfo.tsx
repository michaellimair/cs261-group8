import { FC } from 'react';
import {
  Text,
  Link,
  Heading,
  VStack,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';

interface IMeetingCardInfoProps {
  title: string;
  body: string;
  linkToMeeting: string;
}

const MeetingCardInfo: FC<IMeetingCardInfoProps> = ({
  title,
  body,
  linkToMeeting,
}) => {
  const { t } = useTranslation();

  return (
    <VStack align="left">
      <Heading>{title}</Heading>
      <Text fontSize={{ base: 'lg' }} textAlign="left" maxW="4xl">
        {body}
      </Text>
      <Link color="teal.500" href={linkToMeeting} isExternal>
        {t('link_to_meeting')}
        {' '}
        <ExternalLinkIcon mx="2px" />
      </Link>
    </VStack>
  );
};

export default MeetingCardInfo;
