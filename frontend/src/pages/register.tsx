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
  FormErrorMessage,
} from '@chakra-ui/react';
import { FC, useState, useCallback } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import RouterLink from 'components/RouterLink';
import { useTranslation } from 'react-i18next';
import { useForm, UseFormRegister } from 'react-hook-form';
import { IRegistration, IRegistrationError, IUser } from 'customTypes/auth';
import { useMutation } from 'react-query';
import { httpClient } from 'api';
import BadRequestApiError from 'api/error/BadRequestApiError';

const LoginLinkButton: FC = () => {
  const { t } = useTranslation();

  return (
    <Stack pt={6}>
      <Text align="center">
        {t('already_a_user')}
        {' '}
        <RouterLink color="blue.400" to="/auth" data-testid="login-button">{t('login')}</RouterLink>
      </Text>
    </Stack>
  );
};

interface INameFieldData {
  firstNameError: string | string[] | undefined;
  lastNameError: string | string[] | undefined;
  register: UseFormRegister<IRegistration>;
}

const NameField: FC<INameFieldData> = ({
  firstNameError,
  lastNameError,
  register,
}) => {
  const { t } = useTranslation();

  return (
    <HStack mb={2}>
      <Box>
        <FormControl id="firstName" isRequired isInvalid={Boolean(firstNameError)}>
          <FormLabel htmlFor="firstName">{t('firstName')}</FormLabel>
          <Input
            data-testid="first_name"
            id="firstName"
            autoComplete="given-name"
            type="text"
            {...register('first_name', {
              required: t('no_blank', { field: t('firstName') })?.[0],
            })}
          />
          <FormErrorMessage>
            {firstNameError}
          </FormErrorMessage>
        </FormControl>
      </Box>
      <Box>
        <FormControl id="lastName" isRequired isInvalid={Boolean(lastNameError)}>
          <FormLabel htmlFor="lastName">{t('lastName')}</FormLabel>
          <Input
            data-testid="last_name"
            id="lastName"
            autoComplete="given-name"
            type="text"
            {...register('last_name', {
              required: t('no_blank', { field: t('lastName') })?.[0],
            })}
          />
          <FormErrorMessage>
            {lastNameError}
          </FormErrorMessage>
        </FormControl>
      </Box>
    </HStack>
  );
};

const RegisterPage: FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors: formErrors } } = useForm<IRegistration>();
  const {
    mutate, isLoading, error, isSuccess,
  } = useMutation<
  IUser,
  BadRequestApiError<IRegistrationError>,
  IRegistration
  >(
    'register',
    (values) => httpClient.auth.register(values),
  );
  const { t } = useTranslation();

  const onSubmit = useCallback((values: IRegistration) => {
    mutate(values);
  }, [mutate]);

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
          <form onSubmit={handleSubmit(onSubmit)} data-testid="registerForm">
            <NameField
              firstNameError={error?.data?.first_name ?? formErrors?.first_name?.message}
              lastNameError={error?.data?.last_name ?? formErrors?.last_name?.message}
              register={register}
            />
            <FormControl id="username" isRequired mb={2} isInvalid={Boolean(error?.data?.username ?? formErrors?.username?.message)}>
              <FormLabel>{t('username')}</FormLabel>
              <Input
                type="text"
                data-testid="username"
                autoComplete="username"
                {...register('username', {
                  required: t('no_blank', { field: t('username') })?.[0],
                })}
              />
              <FormErrorMessage>
                {error?.data?.username ?? formErrors?.username?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="email" isRequired mb={2} isInvalid={Boolean(error?.data?.email ?? formErrors?.email?.message)}>
              <FormLabel>{t('email')}</FormLabel>
              <Input
                type="email"
                data-testid="email"
                autoComplete="email"
                {...register('email', {
                  required: t('no_blank', { field: t('email') })?.[0],
                })}
              />
              <FormErrorMessage>
                {error?.data?.email ?? formErrors?.email?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="new-password" isRequired isInvalid={Boolean(error?.data?.password ?? formErrors?.password?.message)} mb={2}>
              <FormLabel>{t('password')}</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  data-testid="password"
                  {...register('password', {
                    required: t('no_blank', { field: t('password') })?.[0],
                  })}
                />
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
              <FormErrorMessage>
                {error?.data?.password ?? formErrors?.password?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="verify-password" isRequired isInvalid={Boolean(error?.data?.verify_password ?? formErrors?.verify_password?.message)} mb={2}>
              <FormLabel>{t('verify_password')}</FormLabel>
              <InputGroup>
                <Input
                  type="password"
                  autoComplete="new-password"
                  data-testid="verify_password"
                  {...register('verify_password', {
                    required: t('no_blank', { field: t('verify_password') })?.[0],
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {error?.data?.verify_password ?? formErrors?.verify_password?.message}
              </FormErrorMessage>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                disabled={isLoading || isSuccess}
                loadingText={t('registering')}
                type="submit"
                size="lg"
                data-testid="registerButton"
                bg="blue.400"
                color="white"
                _hover={{
                  bg: 'blue.500',
                }}
              >
                {t('register')}
              </Button>
              <FormControl id="non-field" isInvalid={Boolean(error?.data?.non_field_errors)} mt={['0 !important']}>
                <FormErrorMessage>{error?.data?.non_field_errors}</FormErrorMessage>
              </FormControl>
              {isSuccess && (
              <Text align="center">
                {t('register_success')}
              </Text>
              )}
            </Stack>
            <LoginLinkButton />
          </form>
        </Stack>
      </Box>
    </>
  );
};

export default RegisterPage;
