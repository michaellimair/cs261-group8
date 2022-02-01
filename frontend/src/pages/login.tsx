import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import RouterLink from 'components/RouterLink';
import { FC } from 'react';

const LoginPage: FC = () => (
  <>
    <Stack align="center">
      <Heading fontSize="4xl">Sign in to your account</Heading>
      <Text fontSize="lg" color="gray.600">
        to enjoy all of our cool features
        ✌️
      </Text>
    </Stack>
    <Box
      rounded="lg"
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow="lg"
      p={8}
    >
      <Stack spacing={4}>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
        <Stack spacing={10}>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            align="start"
            justify="space-between"
          >
            <Checkbox>Remember me</Checkbox>
            <RouterLink color="blue.400" to="/forgot-password">Forgot password?</RouterLink>
          </Stack>
          <Button
            bg="blue.400"
            color="white"
            _hover={{
              bg: 'blue.500',
            }}
          >
            Sign in
          </Button>
          <Stack pt={6}>
            <Text align="center">
              Do not have an account?
              {' '}
              <RouterLink color="blue.400" to="/auth/register">Register</RouterLink>
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  </>
);

export default LoginPage;
