import {
  Button,
  Flex,
  Checkbox,
  Stack,
  Heading,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  Center,
  IconButton,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import React, {
  useState,
  FC,
  useCallback,
} from 'react';

import { useTranslation } from 'react-i18next';
import AddInterest from 'components/Interests/AddInterest';
import InterestList from 'components/Interests/InterestList';
import { IInterest } from 'customTypes/interest';
import { FormField, FormSelectField } from 'components/Forms';
import {
  IUserProfile,
  IUserProfileDTO, IWelcomeError, JobTitle,
} from 'customTypes/auth';
import BadRequestApiError from 'api/error/BadRequestApiError';
import useCommonForm from 'hooks/useCommonForm';
import { httpClient } from 'api';

import SubmitButton from 'components/Forms/SubmitButton';
import { useUser } from 'hooks/useUser';
import useBusinessAreaOptions from 'hooks/useBusinessAreaOptions';
import useCountries from 'hooks/useCountries';
import useTimezoneOptions from 'hooks/useTimezoneOptions';

const interestList : IInterest[] = [];

const WelcomeForm: FC = () => {
  const { t } = useTranslation();
  const { user } = useUser() || {};
  const { id } = user! || {};
  const mutationFn = useCallback(
    (values: IUserProfileDTO) => httpClient.profile.updateProfile(id, values),
    [id],
  );
  function createOptions(options:string[]) {
    return options.map((option:string) => (
      { label: option, value: option }
    ));
  }
  const [interests, setInterests] = useState<IInterest[]>(interestList);
  const deleteInterest = (interestId: IInterest['id']) => {
    const newInterests = interests.filter((item: { id: number; }) => item.id !== interestId);
    setInterests(newInterests);
  };
  const businessAreaOptions = useBusinessAreaOptions();
  const countryOptions = useCountries();
  const timezoneOptions = useTimezoneOptions();

  const addInterest = (newInterest: IInterest) => {
    setInterests([...interests, newInterest]);
  };

  const {
    register,
    onSubmit,
    errors,
    isLoading,
    isSuccess,
  } = useCommonForm<IUserProfileDTO, BadRequestApiError<IWelcomeError>, IUserProfile>({
    mutationId: 'welcome',
    mutationFn,
    onSuccess: ({ completed }) => {
      if (completed) {
        window.location.reload();
      }
    },
  });

  return (
    <>
      <Stack align="center">
        <Heading fontSize="4xl">
          {t('welcome')}
        </Heading>
      </Stack>
      <form onSubmit={onSubmit} data-testid="welcomeForm">
        <Flex
          w="100%"
          align="center"
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <Stack w="250px" direction={['column', 'row']} spacing={16}>
            <Stack h="10%">
              <Center>
                <Avatar size="xl">
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
                </Avatar>
              </Center>
              <Center>
                <Button w="full">{t('change_avatar')}</Button>
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
          </Stack>

          <Stack w="80%" spacing="36px">
            <Stack direction={['column', 'row']} spacing={6}>
              <Stack w="200px">
                <Heading fontSize="1xl">{t('select_mentor_mentee')}</Heading>
                <Stack direction={['column', 'row']} spacing={6}>
                  <Checkbox>{t('mentor')}</Checkbox>
                  <Checkbox>{t('mentee')}</Checkbox>
                </Stack>
              </Stack>
              <Stack width="200px">
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
            </Stack>
            <Heading fontSize="1xl">Interests</Heading>
            <InterestList interests={interests} deleteInterest={deleteInterest} />
            <AddInterest addInterest={addInterest} />
            <Stack direction={['column', 'row']} spacing={6}>
              <Stack width="200px">
                <FormSelectField
                  name="title"
                  autoComplete="title"
                  register={register}
                  error={errors?.profile?.title}
                  required
                  options={createOptions(Object.values(JobTitle))}
                  label={t('seniority')}
                />
              </Stack>
              <Stack width="200px">
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
              <Stack width="200px">
                <FormSelectField
                  name="timezone"
                  autoComplete="timezone"
                  register={register}
                  error={errors?.profile?.timezone}
                  required
                  options={timezoneOptions}
                  label={t('time_zone')}
                />
              </Stack>
              <Stack width="200px">
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
            </Stack>
            <Stack w="250px">
              <SubmitButton
                disabled={isLoading || isSuccess}
                loadingText={t('submitting')}
                testId="submitButton"
              >
                {t('submit_form')}
              </SubmitButton>
            </Stack>
          </Stack>
        </Flex>
      </form>
    </>
  );
};

export default WelcomeForm;
