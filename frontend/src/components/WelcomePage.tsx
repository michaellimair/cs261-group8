import React, { FC } from 'react';
import {
  Flex,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const WelcomePage: FC = () => (
  <Flex
    minH="100vh"
    align="center"
    justify="center"
    bg={useColorModeValue('gray.50', 'gray.800')}
  >
    <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
      <Outlet />
    </Stack>
  </Flex>
);

export default WelcomePage;
