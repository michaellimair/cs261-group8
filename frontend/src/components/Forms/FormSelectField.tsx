import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { IFieldProps } from 'customTypes/form';
import { PropsWithChildren } from 'react';

interface IFormSelectFieldProps<T> extends Omit<IFieldProps<T>, 'type'> {
  options: {
    label: string;
    value: any;
  }[];
  placeholder?: string;
  label: string;
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
}: PropsWithChildren<IFormSelectFieldProps<T>>) => (
  <FormControl
    id={name}
    data-testid={`${name}-formcontrol`}
    isRequired={required}
    isInvalid={Boolean(error)}
    mb={2}
  >
    <FormLabel data-testid={`${name}-label`}>{formLabel}</FormLabel>
    <Select placeholder={placeholder} {...register(name)} autoComplete={autoComplete}>
      {options.map(({ label, value }) => (
        <option value={value as any} key={value as any}>{label}</option>
      ))}
    </Select>
  </FormControl>
  );

export default FormSelectField;
