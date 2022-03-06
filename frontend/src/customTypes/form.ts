import { Path, UseFormRegister } from 'react-hook-form';

export interface IFieldProps<T> {
  name: Path<T>;
  autoComplete?: string;
  register: UseFormRegister<T>;
  error?: string | string[] | undefined;
  required?: boolean,
  type?: React.HTMLInputTypeAttribute;
  label?: string;
  placeholder?: string;
}
