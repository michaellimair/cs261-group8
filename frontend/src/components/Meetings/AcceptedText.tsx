import {
  Text,
  Box,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const AcceptedText = () => {
  const { t } = useTranslation();

  return (
    <Box pl="8">
      <Text fontSize={{ base: '3xl' }} fontWeight="bold" textAlign="center" color="green">
        {t('accepted')}
      </Text>
    </Box>
  );
};

export default AcceptedText;
