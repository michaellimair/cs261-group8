import {
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  Stack,
  Avatar,
  Center,
  FormErrorMessage,
  FormControl,
  InputGroup,
} from '@chakra-ui/react';

import {
  FC, useCallback, useEffect, useRef,
} from 'react';
import { useUser } from 'hooks/useUser';
import {
  IUserProfile, IUserProfileDTO,
} from 'customTypes/auth';
import { httpClient } from 'api';
import { useQuery } from 'react-query';
import useCommonForm from 'hooks/useCommonForm';
import ApiError from 'api/error/ApiError';
import { FormField, FormSelectField } from 'components/Forms';
import { useTranslation } from 'react-i18next';
import { omit } from 'lodash';
import useCountries from 'hooks/useCountries';
import useTitleOptions from 'hooks/useTitleOptions';
import useTimezoneOptions from 'hooks/useTimezoneOptions';
import useBusinessAreaOptions from 'hooks/useBusinessAreaOptions';

const UserProfile: FC = () => {
  const { user } = useUser();
  const countryOptions = useCountries();
  const titleOptions = useTitleOptions();
  const timezoneOptions = useTimezoneOptions();
  const businessAreaOptions = useBusinessAreaOptions();

  const { t } = useTranslation();

  const { data: userProfile, refetch } = useQuery(['profile', user?.id], () => httpClient.profile.getProfile(user?.id!));
  const avatarInputRef = useRef<HTMLInputElement>();
  const onAvatarClick = useCallback(() => {
    avatarInputRef.current?.click();
  }, []);
  const {
    register,
    onSubmit,
    errors,
    watch,
    reset,
    setValue,
  } = useCommonForm<IUserProfileDTO, ApiError<any>, IUserProfile>({
    mutationFn: async (values) => httpClient.profile.updateProfile(
      user?.id!,
      values,
    ),
    mutationId: ['profile', user?.id!, 'update'],
    onSuccess: () => {
      refetch();
    },
  });

  useEffect(() => {
    if (userProfile) {
      reset(omit(userProfile, ['avatar', 'business_area']));
    }
  }, [userProfile, reset]);

  const avatarFile = watch('avatar');

  return (
    <form id="frm-profile" onSubmit={onSubmit}>
      <Flex
        minH="100vh"
        align="center"
        justify="center"
        bg="white"
      >
        <Stack
          spacing={4}
          w="full"
          maxW="md"
          bg="white"
          rounded="xl"
          boxShadow="lg"
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            My Profile
          </Heading>
          <Center>
            <Avatar className="mx-auto" size="xl" src={avatarFile ? URL.createObjectURL(avatarFile) : userProfile?.avatar!} name={user?.full_name!} />
          </Center>
          <InputGroup alignItems="center" justifyContent="center">
            <Button onClick={onAvatarClick}>
              <Input
                type="file"
                multiple={false}
                {...register('avatar')}
                ref={avatarInputRef as any}
                hidden
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    setValue('avatar', e.target.files[0]);
                  }
                }}
              />
              {t('change_avatar')}
            </Button>
          </InputGroup>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="UserName"
            value={user?.username}
            readOnly
            _placeholder={{ color: 'gray.500' }}
            disabled
            type="text"
          />

          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            value={user?.email}
            readOnly
            disabled
            _placeholder={{ color: 'gray.500' }}
            type="email"
          />
          <FormField<IUserProfileDTO>
            register={register}
            name="pronoun"
            error={errors?.pronoun}
          />
          <FormSelectField
            name="timezone"
            label={t('timezone')}
            required
            error={errors?.timezone}
            register={register}
            options={timezoneOptions}
          />
          <FormSelectField
            name="country"
            label={t('country')}
            required
            error={errors?.country}
            register={register}
            options={countryOptions}
          />
          <FormSelectField
            name="business_area_id"
            label={t('business_area')}
            required
            error={errors?.business_area_id}
            register={register}
            valueAsNumber
            options={businessAreaOptions}
          />
          <FormSelectField
            name="title"
            label={t('title')}
            error={errors?.title}
            register={register}
            options={titleOptions}
          />
          <FormField<IUserProfileDTO>
            register={register}
            name="years_experience"
            error={errors?.years_experience}
            type="number"
          />
          <FormControl id="non-field" isInvalid={Boolean(errors?.non_field_errors)} mt={['0 !important']}>
            <FormErrorMessage>{errors?.non_field_errors}</FormErrorMessage>
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg="blue.400"
              color="white"
              w="full"
              _hover={{
                bg: 'blue.500',
              }}
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>

  );
};

export default UserProfile;
