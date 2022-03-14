import {
  Flex,
  Box,
  Button,
  Heading,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import useCommonForm from 'hooks/useCommonForm';
import { IMeeting, IMeetingCreateDTO } from 'customTypes/meeting';
import ApiError from 'api/error/ApiError';
import { httpClient } from 'api';
import { FormField, FormSelectField } from 'components/Forms';
import FormTextAreaField from 'components/Forms/FormTextareaField';
import FormDateField from 'components/Forms/FormDateField';
import { FC, useMemo } from 'react';
import { UseFormRegister } from 'react-hook-form';
import {
  IPlanOfAction,
} from 'customTypes/plan-of-action';

interface ICreateMeetingPlanOfActionFieldProps {
  register: UseFormRegister<IMeetingCreateDTO>;
}

const CreateMeetingPlanOfActionField: FC<ICreateMeetingPlanOfActionFieldProps> = ({
  register,
}) => {
  const { t } = useTranslation();
  const { isLoading, data } = useQuery<IPlanOfAction[]>(
    ['plans-of-action'],
    () => httpClient.menteePlanOfAction.listPlansOfAction(),
  );

  const options = useMemo(() => [
    { value: null, label: '-' },
    ...(data?.map((it) => ({
      label: it.title,
      value: it.id,
    })) ?? []),
  ], [data]);

  return (
    <FormSelectField
      disabled={isLoading}
      register={register}
      valueAsNumber
      options={options}
      name="plan_of_action_ids"
      label={t('plan_of_action.title.other')}
    />
  );
};

const CreateMeetingCard = () => {
  const { t } = useTranslation();
  const {
    register,
    onSubmit,
    errors,
    watch,
    setValue,
  } = useCommonForm<IMeetingCreateDTO, ApiError<any>, IMeeting>({
    mutationId: 'create-meeting',
    mutationFn: (values: IMeetingCreateDTO) => httpClient.menteeMeeting.createMeeting(values),
  });

  return (
    <Flex
      verticalAlign="top"
      align="center"
      p="4"
      pl="8"
      pr="8"
      boxShadow="lg"
      m="4"
      borderBottomRadius="lg"
      borderTopRadius="0"
      bg="white"
    >
      <Box as="form" onSubmit={onSubmit} flex="1.25" py={2}>
        <Heading size="md" mb={4}>{t('create_meeting')}</Heading>
        <FormField
          register={register}
          error={errors.title}
          required
          name="event.title"
          label={t('title')}
        />
        <FormTextAreaField
          register={register}
          error={errors.description}
          required
          name="event.description"
          label={t('description')}
        />
        <FormDateField
          showTimeSelect
          minDate={new Date()}
          name="event.start_time"
          label={t('event.start_time')}
          watch={watch}
          setValue={setValue}
          required
          placeholder={t('event.start_time')}
        />
        <FormDateField
          showTimeSelect
          minDate={new Date()}
          name="event.end_time"
          label={t('event.end_time')}
          watch={watch}
          setValue={setValue}
          required
          placeholder={t('event.end_time')}
        />
        <FormTextAreaField
          register={register}
          error={errors.location}
          required
          name="event.location"
          label={t('event.location')}
          helperText={t('event.location_help')}
        />
        <CreateMeetingPlanOfActionField
          register={register}
        />
        <Button colorScheme="blue" w="full" mt={2} type="submit">
          {t('create')}
        </Button>
      </Box>
    </Flex>
  );
};

export default CreateMeetingCard;
