import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import RouterLink from 'components/RouterLink';
import { useTranslation } from 'react-i18next';

const RegisterPage: FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <>
      <Stack align="center">
        <Heading fontSize="4xl" textAlign="center">
          {t('register')}
        </Heading>
      </Stack>
      <Box
        rounded="lg"
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow="lg"
        p={8}
      >
        <Stack spacing={4}>
          <HStack>
            <Box>
              <FormControl id="firstName" isRequired>
                <FormLabel>{t('firstName')}</FormLabel>
                <Input type="text" />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="lastName">
                <FormLabel>{t('lastName')}</FormLabel>
                <Input type="text" />
              </FormControl>
            </Box>
          </HStack>
          <FormControl id="email" isRequired>
            <FormLabel>{t('email')}</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>{t('password')}</FormLabel>
            <InputGroup>
              <Input type={showPassword ? 'text' : 'password'} data-testid="password" />
              <InputRightElement h="full">
                <Button
                  variant="ghost"
                  data-testid="show-password-button"
                  onClick={() => setShowPassword((show) => !show)}
                >
                  {showPassword ? <ViewIcon data-testid="password-shown" /> : <ViewOffIcon data-testid="password-hidden" />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button
              loadingText="Submitting"
              size="lg"
              bg="blue.400"
              color="white"
              _hover={{
                bg: 'blue.500',
              }}
            >
              {t('register')}
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align="center">
              {t('already_a_user')}
              {' '}
              <RouterLink color="blue.400" to="/auth" data-testid="login-button">{t('login')}</RouterLink>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default RegisterPage;
