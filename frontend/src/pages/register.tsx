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
import { useTranslation } from 'react-i18next';
import {
  UseFormRegister,
} from 'react-hook-form';
import { IRegistration, IRegistrationError, IUser } from 'customTypes/auth';
import { httpClient } from 'api';
import BadRequestApiError from 'api/error/BadRequestApiError';
import FormField from 'components/Forms/FormField';
import SubmitButton from 'components/Forms/SubmitButton';
import AlternateAuthAction from 'components/AlternateAuthAction';
import useCommonForm from 'hooks/useCommonForm';
import useLogin from 'hooks/useLogin';

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
  const { t } = useTranslation();
  const mutationFn = useCallback((values: IRegistration) => httpClient.auth.register(values), []);
  const { login } = useLogin();
  const onSuccess = useCallback((_: IUser, values: IRegistration) => login({
    username: values.username,
    password: values.password,
  }), [login]);
  const {
    register,
    onSubmit,
    errors,
    isLoading,
    isSuccess,
  } = useCommonForm<IRegistration, BadRequestApiError<IRegistrationError>, IUser>({
    mutationId: 'register',
    mutationFn,
    onSuccess,
  });

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
          <form onSubmit={onSubmit} data-testid="registerForm">
            <NameField
              firstNameError={errors?.first_name}
              lastNameError={errors?.last_name}
              register={register}
            />
            <FormField
              name="username"
              required
              autoComplete="username"
              error={errors?.username}
              register={register}
            />
            <FormField
              name="email"
              required
              autoComplete="email"
              type="email"
              error={errors?.email}
              register={register}
            />
            <FormField
              name="password"
              autoComplete="new-password"
              type="password"
              required
              error={errors?.password}
              register={register}
            />
            <FormField
              name="verify_password"
              autoComplete="new-password"
              type="password"
              required
              error={errors?.verify_password}
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
              <FormControl id="non-field" isInvalid={Boolean(errors?.non_field_errors)} mt={['0 !important']}>
                <FormErrorMessage>{errors?.non_field_errors}</FormErrorMessage>
              </FormControl>
              {isSuccess && (
              <Text align="center" data-testid="register_success">
                {t('register_success')}
              </Text>
              )}
            </Stack>
            <AlternateAuthAction
              question={t('already_a_user')}
              linkText={t('login')}
              linkTestId="login-button"
              to="/auth"
            />
          </form>
        </Stack>
      </Box>
    </>
  );
};

export default RegisterPage;
