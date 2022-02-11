import { Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';
import RouterLink from 'components/RouterLink';

interface IAlternateAuthActionProps {
  question: string;
  to: string;
  linkTestId?: string;
  linkText: string;
}

const AlternateAuthAction: FC<IAlternateAuthActionProps> = ({
  question,
  to,
  linkTestId,
  linkText,
}) => (
  <Stack pt={6}>
    <Text align="center">
      {question}
      {' '}
      <RouterLink color="blue.400" to={to} data-testid={linkTestId}>{linkText}</RouterLink>
    </Text>
  </Stack>
);

export default AlternateAuthAction;
