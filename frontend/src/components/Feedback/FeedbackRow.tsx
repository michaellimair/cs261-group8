import {
  Stack, Text, Button, VStack, HStack,
} from '@chakra-ui/react';
import ContainerBox from 'components/ContainerBox';
import RouterLink from 'components/RouterLink';
import { IFeedback } from 'customTypes/feedback';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import FeedbackIcon from './FeedbackIcon';

interface IFeedbackRowProps {
  feedback: IFeedback;
  showView?: boolean;
  showEdit?: boolean;
}

const FeedbackRow: FC<IFeedbackRowProps> = ({
  feedback: {
    title, content, created, modified, type, id,
  },
  showView = true,
  showEdit = true,
}) => {
  const { t } = useTranslation();

  return (
    <ContainerBox>
      <Stack direction="row" alignItems="center" mb="2">
        <Text fontWeight="semibold" fontSize="xl" mr={2}>{title}</Text>
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
          {showView && (
          <Button as={RouterLink} to={`${id}`} colorScheme="blue">
            {t('view')}
          </Button>
          )}
          {showEdit && (
          <Button as={RouterLink} to={`${id}/edit`} colorScheme="green">
            {t('edit')}
          </Button>
          )}
        </HStack>
      </Stack>
    </ContainerBox>
  );
};

export default FeedbackRow;
