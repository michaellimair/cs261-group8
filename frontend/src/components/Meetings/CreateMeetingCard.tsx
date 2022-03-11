import {
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
import { useTranslation } from 'react-i18next';

const CreateMeetingCard = () => {
  const { t } = useTranslation();

  return (
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
    >
      <Box flex="1.25">
        <VStack align="left">
          <Heading size="md">{t('create_meeting')}</Heading>
          <HStack>
            <VStack align="left" spacing="4">
              <Text>
                {`${t('title')}:`}
              </Text>
              <Text>
                {`${t('date')}:`}
              </Text>
              <Text>
                {`${t('time')}:`}
              </Text>
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
          <Text>{t('description')}</Text>
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
            {t('create')}
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default CreateMeetingCard;
