import {
  Button,
  Flex,
  Stack,
  Heading,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  Center,
  IconButton,
  Input,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import React, {
  useState,
  FC,
  useCallback,
  useRef,
} from 'react';

import { useTranslation } from 'react-i18next';
import AddInterest from 'components/Interests/AddInterest';
import InterestList from 'components/Interests/InterestList';
import { FormField, FormSelectField } from 'components/Forms';
import {
  IUserProfile,
  IUserProfileDTO,
  IWelcomeError,
} from 'customTypes/auth';
import BadRequestApiError from 'api/error/BadRequestApiError';
import useCommonForm from 'hooks/useCommonForm';
import { httpClient } from 'api';

import SubmitButton from 'components/Forms/SubmitButton';
import { useUser } from 'hooks/useUser';
import useBusinessAreaOptions from 'hooks/useBusinessAreaOptions';
import useCountries from 'hooks/useCountries';
import useTitleOptions from 'hooks/useTitleOptions';
import LanguageList from 'components/WelcomeForm/Languages';
import TimezoneSelect from 'components/WelcomeForm/TimezoneSelect';

const WelcomeForm: FC = () => {
  const { t } = useTranslation();
  const { user, reauthenticate } = useUser() || {};
  const { id } = user! || {};
  const mutationFn = useCallback(
    async (values: IUserProfileDTO) => {
      const result = httpClient.profile.updateProfile(id, values);
      await reauthenticate();
      return result;
    },
    [id, reauthenticate],
  );
  const [interests, setInterests] = useState<string[]>([]);
  const deleteInterest = (interest: string) => {
    const newInterests = interests.filter((item) => interest !== item);
    setInterests(newInterests);
  };
  const businessAreaOptions = useBusinessAreaOptions();
  const countryOptions = useCountries();
  const titleOptions = useTitleOptions();

  const avatarInputRef = useRef<HTMLInputElement>();
  const onAvatarClick = useCallback(() => {
    avatarInputRef.current?.click();
  }, []);

  const {
    register,
    onSubmit,
    errors,
    isLoading,
    watch,
    setValue,
    control,
  } = useCommonForm<IUserProfileDTO, BadRequestApiError<IWelcomeError>, IUserProfile>({
    mutationId: 'welcome',
    mutationFn,
  });
  const addInterest = (newInterest: string) => {
    const updatedInterests = [...interests, newInterest];
    setInterests(updatedInterests);
    setValue('skills', updatedInterests);
  };

  const avatarFile = watch('avatar');

  return (
    <Flex
      w="100%"
      align="center"
      rounded="lg"
      direction="column"
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow="lg"
      p={8}
    >
      <Stack align="center">
        <Heading fontSize="4xl">
          {t('welcome')}
        </Heading>
      </Stack>
      <form onSubmit={onSubmit} data-testid="welcomeForm" style={{ width: '100%' }}>
        <Stack>
          <Center>
            <Avatar
              size="xl"
              src={avatarFile ? URL.createObjectURL(avatarFile) : undefined}
              name={user?.full_name!}
            >
              <AvatarBadge
                align="center"
                as={IconButton}
                size="sm"
                rounded="full"
                top="-10px"
                colorScheme="red"
                aria-label="remove Image"
                icon={<SmallCloseIcon />}
              />
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
            </Avatar>
          </Center>
          <Center>
            <Button onClick={onAvatarClick}>{t('change_avatar')}</Button>
          </Center>
          <FormField
            name="pronoun"
            autoComplete="pronoun"
            type="text"
            required
            error={errors?.pronoun}
            register={register}
          />
        </Stack>

        <Stack spacing="36px">
          <Stack mt={4}>
            <FormSelectField
              name="groups"
              multiple
              register={register}
              error={errors?.profile?.business_area}
              required
              valueAsNumber
              options={[
                {
                  value: 1,
                  label: 'mentor',
                },
                {
                  value: 2,
                  label: 'mentee',
                },
              ]}
              label={t('select_mentor_mentee')}
            />
          </Stack>
          <Stack>
            <FormSelectField
              name="business_area_id"
              autoComplete="business"
              register={register}
              error={errors?.profile?.business_area}
              required
              options={businessAreaOptions}
              label={t('business_area')}
            />
          </Stack>
          <Heading fontSize="1xl">Interests</Heading>
          <InterestList interests={interests} deleteInterest={deleteInterest} />
          <AddInterest addInterest={addInterest} />
          <LanguageList control={control} />
          <Stack direction={['column', 'row']} spacing={6}>
            <Stack>
              <FormSelectField
                name="title"
                autoComplete="title"
                register={register}
                error={errors?.profile?.title}
                required
                options={titleOptions}
                label={t('seniority')}
              />
            </Stack>
            <Stack>
              <FormField
                name="years_experience"
                autoComplete={t('years_of_experience')}
                type="number"
                required
                error={errors?.pronoun}
                register={register}
                label={t('years_of_experience')}
              />
            </Stack>
          </Stack>
          <Stack direction={['column', 'row']} spacing={6}>
            <Stack>
              <FormSelectField
                name="country"
                autoComplete="Country"
                register={register}
                error={errors?.profile?.countries}
                required
                options={countryOptions}
                label={t('country')}
              />
            </Stack>
            <Stack>
              <TimezoneSelect
                register={register}
                errors={errors}
                watch={watch}
              />
            </Stack>
          </Stack>
          <Stack w="250px">
            <SubmitButton
              disabled={isLoading}
              loadingText={t('submitting')}
              testId="submitButton"
            >
              {t('submit_form')}
            </SubmitButton>
          </Stack>
        </Stack>
      </form>
    </Flex>
  );
};

export default WelcomeForm;
