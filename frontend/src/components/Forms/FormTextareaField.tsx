import { FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import { IFieldProps } from 'customTypes/form';
import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

interface IFormTextAreaFieldProps<T> extends Omit<IFieldProps<T>, 'type'> {
  label: string;
}

const FormTextAreaField = <T extends any>({
  name,
  autoComplete,
  register,
  error,
  required,
  label: formLabel,
  placeholder,
}: PropsWithChildren<IFormTextAreaFieldProps<T>>) => {
  const { t } = useTranslation();

  return (
    <FormControl
      id={name}
      data-testid={`${name}-formcontrol`}
      isRequired={required}
      isInvalid={Boolean(error)}
      mb={2}
    >
      <FormLabel data-testid={`${name}-label`}>{formLabel}</FormLabel>
      <Textarea
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name, {
          required: t('no_blank', { field: t('content') }) as any,
        })}
      />
    </FormControl>
  );
};

export default FormTextAreaField;
