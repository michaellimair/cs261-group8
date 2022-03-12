import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react';
import React, {
  useState, useEffect, PropsWithChildren,
} from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';
import { IFieldProps } from 'customTypes/form';

const FormField = <T extends any>({
  name,
  autoComplete,
  register,
  error,
  required,
  label: formLabel,
  type = 'text',
  placeholder,
}: PropsWithChildren<IFieldProps<T>>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [fieldType, setFieldType] = useState<React.HTMLInputTypeAttribute>(type);
  const { t } = useTranslation();

  useEffect(() => {
    if (type !== 'password') {
      return;
    }
    if (showPassword) {
      setFieldType('text');
    } else {
      setFieldType('password');
    }
  }, [showPassword, type]);

  return (
    <FormControl id={name} data-testid={`${name}-formcontrol`} isRequired={required} mb={2} isInvalid={Boolean(error)}>
      <FormLabel data-testid={`${name}-label`}>{formLabel ?? t(name)}</FormLabel>
      <InputGroup>
        <Input
          type={fieldType}
          data-testid={name}
          autoComplete={autoComplete}
          {...register(name, {
            required: required ? t('no_blank', { field: formLabel ?? t(name) }) as any : undefined,
            valueAsNumber: type === 'number',
          })}
          placeholder={placeholder}
        />
        {type === 'password' && (
        <InputRightElement h="full" data-testid="show-password-toggle">
          <Button
            variant="ghost"
            data-testid="show-password-button"
            onClick={() => {
              setShowPassword((show) => !show);
            }}
          >
            {showPassword ? <ViewIcon data-testid="password-shown" /> : <ViewOffIcon data-testid="password-hidden" />}
          </Button>
        </InputRightElement>
        )}
      </InputGroup>
      <FormErrorMessage>
        {error}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FormField;
