import {
  FormControl, FormHelperText, FormLabel, Textarea,
} from '@chakra-ui/react';
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
  helperText,
  disabled,
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
        disabled={disabled}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name, {
          required: t('no_blank', { field: t('content') }) as any,
        })}
      />
      {helperText && (
      <FormHelperText>
        {helperText}
      </FormHelperText>
      )}
    </FormControl>
  );
};

export default FormTextAreaField;
