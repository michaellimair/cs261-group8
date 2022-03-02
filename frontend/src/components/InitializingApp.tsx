import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Spinner } from '@chakra-ui/react';

const InitializingApp: FC = () => {
  const { t } = useTranslation();

  return (
    <Container p={6} alignItems="center" textAlign="center" justifyContent="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      <p>{t('initializing_app')}</p>
    </Container>
  );
};

export default InitializingApp;
