import React, { FC } from 'react';
import {
  Flex,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from 'hooks/useUser';

const AuthLayout: FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const { isLoggedIn } = useUser();

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={bgColor}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Outlet />
      </Stack>
    </Flex>
  );
};

export default AuthLayout;
