import {
  Text,
  Box,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const RequestedText = () => {
  const { t } = useTranslation();

  return (
    <Box pl="8">
      <Text fontSize={{ base: '3xl' }} fontWeight="bold" textAlign="center" color="orange">
        {t('meeting_requested')}
      </Text>
    </Box>
  );
};

export default RequestedText;
