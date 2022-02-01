// import Login from /'components/Login';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import RouterLink from 'components/RouterLink';

const RegisterPage: FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Stack align="center">
        <Heading fontSize="4xl" textAlign="center">
          Sign up
        </Heading>
        <Text fontSize="lg" color="gray.600">
          to enjoy all of our cool features ✌️
        </Text>
      </Stack>
      <Box
        rounded="lg"
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow="lg"
        p={8}
      >
        <Stack spacing={4}>
          <HStack>
            <Box>
              <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input type="text" />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input type="text" />
              </FormControl>
            </Box>
          </HStack>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input type={showPassword ? 'text' : 'password'} />
              <InputRightElement h="full">
                <Button
                  variant="ghost"
                  onClick={() => setShowPassword((show) => !show)}
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button
              loadingText="Submitting"
              size="lg"
              bg="blue.400"
              color="white"
              _hover={{
                bg: 'blue.500',
              }}
            >
              Sign up
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align="center">
              Already a user?
              {' '}
              <RouterLink color="blue.400" to="/auth">Login</RouterLink>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default RegisterPage;
