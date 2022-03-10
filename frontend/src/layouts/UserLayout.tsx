import { FC } from 'react';
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react';
import { Navigate, Outlet } from 'react-router-dom';
import SidebarContent from 'components/Sidebar/SidebarContent';
import SidebarMobileNav from 'components/Sidebar/SidebarMobileNav';
import { useUser } from 'hooks/useUser';
import InitializingApp from 'components/InitializingApp';

const UserLayout: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoggedIn, isLoading } = useUser();
  const bgColor = useColorModeValue('gray.100', 'gray.900');

  if (isLoading) {
    return <InitializingApp data-testid="initializing" />;
  }

  if (!isLoading && !isLoggedIn) {
    return <Navigate replace to="/auth" />;
  }

  return (
    <Box minH="100vh" bg={bgColor}>
      <SidebarContent
        onClose={onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <SidebarMobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet />
      </Box>
    </Box>
  );
};

export default UserLayout;
