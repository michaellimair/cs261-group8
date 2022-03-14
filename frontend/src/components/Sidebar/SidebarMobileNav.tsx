import React, { FC } from 'react';
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
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import {
  FiMenu,
  FiChevronDown,
} from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useUser } from 'hooks/useUser';
import useLogout from 'hooks/useLogout';
import RouterLink from 'components/RouterLink';

interface ISidebarMobileNavProps extends FlexProps {
  onOpen: () => void;
}

const SidebarMobileNav: FC<ISidebarMobileNavProps> = ({ onOpen, ...rest }) => {
  const { t } = useTranslation();
  const { user } = useUser();
  const { onLogout, isLoggingOut } = useLogout();

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
        <Flex alignItems="center">
          <Menu>
            <MenuButton
              py={2}
              data-testid="menuButton"
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar
                  size="sm"
                  src={user?.profile?.avatar ?? undefined}
                  name={user?.full_name}
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
              <MenuItem as={RouterLink} to="profile">{t('dashboard.profile.title')}</MenuItem>
              <MenuItem onClick={onLogout} data-testid="logoutButton" disabled={isLoggingOut}>{t('logout')}</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default SidebarMobileNav;
