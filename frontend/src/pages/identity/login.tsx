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
import React, { FC, useCallback } from 'react';
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
    mutationId: 'login',
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
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align="start"
                justify="space-between"
              >
                <Checkbox>{t('remember_me')}</Checkbox>
                <RouterLink color="blue.400" to="/forgot-password">{t('forgot_password')}</RouterLink>
              </Stack>
              <SubmitButton
                disabled={isLoading || isSuccess}
                loadingText={t('logging_in')}
                testId="loginButton"
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
