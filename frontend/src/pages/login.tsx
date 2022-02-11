import {
  Text,
  Box,
  Checkbox,
  Stack,
  Heading,
  useColorModeValue,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import RouterLink from 'components/RouterLink';
import React, {
  FC, useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { httpClient } from 'api';
import BadRequestApiError from 'api/error/BadRequestApiError';
import FormField from 'components/Forms/FormField';
import {
  ILogin,
  ILoginError,
  ILoginResult,
} from 'customTypes/auth';
import useCommonForm from 'hooks/useCommonForm';
import AlternateAuthAction from 'components/AlternateAuthAction';
import SubmitButton from 'components/Forms/SubmitButton';

const LoginPage: FC = () => {
  const { t } = useTranslation();
  const mutationFn = useCallback((values: ILogin) => httpClient.auth.login(values), []);
  const {
    register,
    onSubmit,
    errors,
    isLoading,
    isSuccess,
  } = useCommonForm<ILogin, BadRequestApiError<ILoginError>, ILoginResult>({
    mutationId: 'register',
    mutationFn,
  });

  return (
    <>
      <Stack align="center">
        <Heading fontSize="4xl">
          {t('login')}
        </Heading>
      </Stack>
      <Box
        rounded="lg"
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow="lg"
        p={8}
      >
        <Stack spacing={4}>
<<<<<<< Updated upstream
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="email" isInvalid={errors.name}>
              <FormLabel htmlFor="name">{t('email')}</FormLabel>
              <Input data-testid="email-field" {...register('email')} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>{t('password')}</FormLabel>
              <Input data-testid="password-field" {...register('password')} />
            </FormControl>
=======
          <form onSubmit={onSubmit} data-testid="loginForm">
            <FormField
              name="username"
              required
              autoComplete="username"
              error={errors?.username}
              register={register}
            />
            <FormField
              name="password"
              autoComplete="password"
              type="password"
              required
              error={errors?.password}
              register={register}
            />
>>>>>>> Stashed changes
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align="start"
                justify="space-between"
              >
                <Checkbox>{t('remember_me')}</Checkbox>
                <RouterLink color="blue.400" to="/forgot-password">{t('forgot_password')}</RouterLink>
              </Stack>
<<<<<<< Updated upstream
              <Button
                bg="blue.400"
                color="white"
                _hover={{
                  bg: 'blue.500',
                }}
                isLoading={isSubmitting}
                type="submit"
                data-testid="login-button"
=======
              <SubmitButton
                disabled={isLoading || isSuccess}
                loadingText={t('logging_in')}
                testId="loginButton"
>>>>>>> Stashed changes
              >
                {t('login')}
              </SubmitButton>
              <FormControl id="non-field" isInvalid={Boolean(errors?.non_field_errors)} mt={['0 !important']}>
                <FormErrorMessage>{errors?.non_field_errors}</FormErrorMessage>
              </FormControl>
              {isSuccess && (
              <Text align="center" data-testid="login_success">
                {t('logging_in')}
              </Text>
              )}
            </Stack>
            <AlternateAuthAction
              question={t('no_account')}
              linkText={t('register')}
              linkTestId="register-button"
              to="/auth/register"
            />
          </form>
        </Stack>
      </Box>
    </>
  );
};

export default LoginPage;
