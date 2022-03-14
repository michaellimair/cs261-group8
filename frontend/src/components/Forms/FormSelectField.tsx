import {
  FormControl, FormErrorMessage, FormLabel, Select,
} from '@chakra-ui/react';
import { IFieldProps } from 'customTypes/form';
import { PropsWithChildren } from 'react';

interface IFormSelectFieldProps<T> extends Omit<IFieldProps<T>, 'type'> {
  options: {
    label: string;
    value: any;
  }[];
  placeholder?: string;
  label: string;
  valueAsNumber?: boolean;
  multiple?: boolean;
}

const FormSelectField = <T extends any>({
  name,
  autoComplete,
  register,
  error,
  required,
  options,
  placeholder,
  label: formLabel,
  valueAsNumber,
  multiple,
  disabled,
}: PropsWithChildren<IFormSelectFieldProps<T>>) => (
  <FormControl
    id={name}
    data-testid={`${name}-formcontrol`}
    isRequired={required}
    isInvalid={Boolean(error)}
    mb={2}
  >
    <FormLabel data-testid={`${name}-label`}>{formLabel}</FormLabel>
    <Select
      placeholder={placeholder}
      {...register(name, {
        valueAsNumber,
      })}
      autoComplete={autoComplete}
      multiple={multiple}
      disabled={disabled}
    >
      {options.map(({ label, value }) => (
        <option value={value as any} key={value as any}>{label}</option>
      ))}
    </Select>
    <FormErrorMessage>
      {error}
    </FormErrorMessage>
  </FormControl>
  );

export default FormSelectField;
