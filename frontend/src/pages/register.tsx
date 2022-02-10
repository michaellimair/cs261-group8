import {
  Box,
  FormControl,
  HStack,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react';
import React, {
  FC, useCallback,
} from 'react';
import RouterLink from 'components/RouterLink';
import { useTranslation } from 'react-i18next';
import { useForm, UseFormRegister } from 'react-hook-form';
import { IRegistration, IRegistrationError, IUser } from 'customTypes/auth';
import { useMutation } from 'react-query';
import { httpClient } from 'api';
import BadRequestApiError from 'api/error/BadRequestApiError';
import FormField from 'components/Forms/FormField';
import SubmitButton from 'components/Forms/SubmitButton';

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
}) => (
  <HStack mb={2}>
    <Box>
      <FormField
        name="first_name"
        required
        autoComplete="given-name"
        error={firstNameError}
        register={register}
      />
    </Box>
    <Box>
      <FormField
        name="last_name"
        required
        autoComplete="family-name"
        error={lastNameError}
        register={register}
      />
    </Box>
  </HStack>
);

const RegisterPage: FC = () => {
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
            <FormField
              name="username"
              required
              autoComplete="username"
              error={error?.data?.username ?? formErrors?.username?.message}
              register={register}
            />
            <FormField
              name="email"
              required
              autoComplete="email"
              type="email"
              error={error?.data?.email ?? formErrors?.email?.message}
              register={register}
            />
            <FormField
              name="password"
              autoComplete="new-password"
              type="password"
              required
              error={error?.data?.password ?? formErrors?.password?.message}
              register={register}
            />
            <FormField
              name="verify_password"
              autoComplete="new-password"
              type="password"
              required
              error={error?.data?.verify_password ?? formErrors?.verify_password?.message}
              register={register}
            />
            <Stack spacing={10} pt={2}>
              <SubmitButton
                disabled={isLoading || isSuccess}
                loadingText={t('registering')}
                testId="registerButton"
              >
                {t('register')}
              </SubmitButton>
              <FormControl id="non-field" isInvalid={Boolean(error?.data?.non_field_errors)} mt={['0 !important']}>
                <FormErrorMessage>{error?.data?.non_field_errors}</FormErrorMessage>
              </FormControl>
              {isSuccess && (
              <Text align="center" data-testid="register_success">
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
