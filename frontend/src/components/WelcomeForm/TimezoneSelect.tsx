import { FormSelectField } from 'components/Forms';
import { IUserProfileDTO } from 'customTypes/auth';
import useTimezoneOptions from 'hooks/useTimezoneOptions';
import { FC } from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface ITimezoneSelectProps {
  register: UseFormRegister<IUserProfileDTO>;
  errors: any;
  watch: UseFormWatch<IUserProfileDTO>;
}

const TimezoneSelect: FC<ITimezoneSelectProps> = ({
  register,
  errors,
  watch,
}) => {
  const { t } = useTranslation();
  const timezoneOptions = useTimezoneOptions();
  const country = watch('country');
  const shownTimezoneOptions = timezoneOptions.filter(
    ({ country_code }) => country_code === country,
  ).map(({ code, name }) => ({
    label: name,
    value: code,
  }));

  return (
    <FormSelectField
      name="timezone"
      autoComplete="timezone"
      register={register}
      error={errors?.timezone}
      required
      placeholder={t('select_timezone')}
      options={shownTimezoneOptions}
      label={t('time_zone')}
    />
  );
};

export default TimezoneSelect;
