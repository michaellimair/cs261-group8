import {
  FormControl,
  FormLabel,
  InputGroup,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import React, {
  PropsWithChildren, useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { IFieldProps } from 'customTypes/form';
import CustomDatePicker from 'components/CustomDatePicker';
import { ReactDatePickerProps } from 'react-datepicker';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

export interface IFormDateFieldProps<T> extends PropsWithChildren<Omit<IFieldProps<T>, 'type' | 'register'>> {
  showTimeSelect?: boolean;
  minDate?: ReactDatePickerProps['minDate'];
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
}

const FormDateField = <T extends any>({
  name,
  autoComplete,
  setValue,
  error,
  required,
  label: formLabel,
  placeholder,
  showTimeSelect,
  minDate,
  watch,
  helperText,
}: IFormDateFieldProps<T>) => {
  const { t } = useTranslation();
  const value = watch(name);

  const onChange = useCallback((date) => {
    setValue(name, date as any);
  }, [name, setValue]);

  return (
    <FormControl id={name} data-testid={`${name}-formcontrol`} isRequired={required} mb={2} isInvalid={Boolean(error)}>
      <FormLabel data-testid={`${name}-label`}>{formLabel ?? t(name)}</FormLabel>
      <InputGroup>
        <CustomDatePicker
          placeholderText={placeholder}
          showTimeSelect={showTimeSelect}
          autoComplete={autoComplete}
          dateFormat="Pp"
          selected={value}
          onChange={onChange}
          minDate={minDate}
          required={required}
        />
      </InputGroup>
      {helperText && (
      <FormHelperText>
        {helperText}
      </FormHelperText>
      )}
      <FormErrorMessage>
        {error}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FormDateField;
