import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import { FormField, FormSelectField, FormTextareaField } from 'components/Forms';
import { IPlanOfActionCreateDTO } from 'customTypes/plan-of-action';
import { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import usePlanTypeOptions from 'hooks/usePlanTypeOptions';

interface IPlanFormProps {
  register: UseFormRegister<IPlanOfActionCreateDTO>;
  errors: any;
}

const PlanFormFields: FC<IPlanFormProps> = ({
  register,
  errors,
}) => {
  const { t } = useTranslation();
  const planTypeOptions = usePlanTypeOptions();

  return (
    <>
      <FormField
        name="title"
        required
        error={errors?.title}
        register={register}
      />
      <FormSelectField
        name="type"
        required
        error={errors?.type}
        register={register}
        label={t('plan_type')}
        options={planTypeOptions}
      />
      <FormTextareaField
        name="description"
        required
        register={register}
        label={t('description')}
        error={errors?.description}
      />
      <FormControl id="non-field" isInvalid={Boolean(errors?.non_field_errors)} mt={['0 !important']}>
        <FormErrorMessage>{errors?.non_field_errors}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export default PlanFormFields;
