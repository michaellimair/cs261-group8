import { Button } from '@chakra-ui/react';
import { FC } from 'react';

interface ISubmitButtonProps {
  disabled?: boolean;
  loadingText: string;
  testId?: string;
  isLoading?: boolean;
}

const SubmitButton: FC<ISubmitButtonProps> = ({
  disabled,
  children,
  loadingText,
  testId,
  isLoading,
}) => (
  <Button
    disabled={disabled}
    loadingText={loadingText}
    isLoading={isLoading}
    type="submit"
    size="lg"
    data-testid={testId}
    bg="blue.400"
    color="white"
    _hover={{
      bg: 'blue.500',
    }}
  >
    {children}
  </Button>

);

export default SubmitButton;
