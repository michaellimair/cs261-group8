import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import RouterLink from 'components/RouterLink';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const LoginPage: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Stack align="center">
        <Heading fontSize="4xl">{t('login')}</Heading>
      </Stack>
      <Box
        rounded="lg"
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow="lg"
        p={8}
      >
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>{t('email')}</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>{t('password')}</FormLabel>
            <Input type="password" />
          </FormControl>
          <Stack spacing={10}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align="start"
              justify="space-between"
            >
              <Checkbox>{t('remember_me')}</Checkbox>
              <RouterLink color="blue.400" to="/forgot-password">{t('forgot_password')}</RouterLink>
            </Stack>
            <Button
              bg="blue.400"
              color="white"
              _hover={{
                bg: 'blue.500',
              }}
            >
              {t('login')}
            </Button>
            <Stack pt={6}>
              <Text align="center">
                {t('no_account')}
                {' '}
                <RouterLink color="blue.400" to="/auth/register" data-testid="register-button">{t('register')}</RouterLink>
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default LoginPage;
