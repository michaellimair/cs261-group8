import {
  Stack, Text, Button, Box, useColorModeValue, VStack, HStack,
} from '@chakra-ui/react';
import { IFeedback } from 'customTypes/feedback';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import FeedbackIcon from './FeedbackIcon';

interface IFeedbackRowProps {
  feedback: IFeedback;
}

const FeedbackRow: FC<IFeedbackRowProps> = ({
  feedback: {
    title, content, created, modified, type,
  },
}) => {
  const { t } = useTranslation();

  return (
    <Box p="4" boxShadow="lg" my="4" borderRadius="md" bg={useColorModeValue('white', 'gray.700')}>
      <Stack direction="row" alignItems="center" mb="2">
        <Text fontWeight="semibold" fontSize="xl">{title}</Text>
        <FeedbackIcon type={type} />
      </Stack>
      <VStack
        my="2"
        direction={{ base: 'column', md: 'row' }}
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Text fontSize={{ base: 'md' }} whiteSpace="pre-wrap">
          {content}
        </Text>
      </VStack>
      <Stack direction={{ base: 'column', lg: 'row' }} justifyContent="space-between" mt="4">
        <VStack
          alignItems="flex-start"
        >
          <Text fontSize={{ base: 'xs' }}>
            {t('created', { created })}
          </Text>
          {modified && (
          <Text fontSize={{ base: 'xs' }}>
            {t('modified', { modified })}
          </Text>
          )}
        </VStack>
        <HStack>
          <Button colorScheme="green">
            View
          </Button>
          <Button colorScheme="blue">
            Edit
          </Button>
          <Button colorScheme="red">
            Delete
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
};

export default FeedbackRow;
