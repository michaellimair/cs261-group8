import React, { FC, useCallback } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import {
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import useUser from 'hooks/useUser';
import useUserDashboardRoutes from 'hooks/useUserDashboardRoutes';
import { useMutation } from 'react-query';
import { httpClient } from 'api';

interface ISidebarMobileNavProps extends FlexProps {
  onOpen: () => void;
}

const SidebarMobileNav: FC<ISidebarMobileNavProps> = ({ onOpen, ...rest }) => {
  const { t } = useTranslation();
  const { mutateAsync, isLoading: isLoggingOut } = useMutation<void>(['logout'], () => httpClient.auth.logout());
  const { user, reauthenticate } = useUser();
  const routes = useUserDashboardRoutes();

  const onLogout = useCallback(async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await mutateAsync();
    await reauthenticate();

    // Hack so that the browser state is totally refreshed
    window.location.assign('/auth');
  }, [mutateAsync, reauthenticate]);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        data-testid="openButton"
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems="center">
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar
                  size="sm"
                  // TODO: Link to actual user avatar
                  src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user?.full_name}</Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              {routes.map((route) => (
                <MenuItem key={route.name}>
                  {t(`dashboard.${route.name}.title`)}
                </MenuItem>
              ))}
              <MenuDivider />
              <MenuItem onClick={onLogout} disabled={isLoggingOut}>{t('logout')}</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default SidebarMobileNav;
