import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import { FormField, FormSelectField, FormTextareaField } from 'components/Forms';
import { IFeedbackDTO } from 'customTypes/feedback';
import useFeedbackTypeOptions from 'hooks/useFeedbackTypeOptions';
import { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface IFeedbackFormProps {
  register: UseFormRegister<IFeedbackDTO>;
  errors: any;
}

const FeedbackFormFields: FC<IFeedbackFormProps> = ({
  register,
  errors,
}) => {
  const { t } = useTranslation();
  const feedbackTypeOptions = useFeedbackTypeOptions();

  return (
    <>
      <FormSelectField
        name="type"
        label={t('dashboard.feedback.type')}
        required
        error={errors?.type}
        register={register}
        options={feedbackTypeOptions}
      />
      <FormField
        name="title"
        required
        error={errors?.title}
        register={register}
      />
      <FormTextareaField
        name="content"
        required
        register={register}
        label={t('content')}
        error={errors?.content}
      />
      <FormControl id="non-field" isInvalid={Boolean(errors?.non_field_errors)} mt={['0 !important']}>
        <FormErrorMessage>{errors?.non_field_errors}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export default FeedbackFormFields;
