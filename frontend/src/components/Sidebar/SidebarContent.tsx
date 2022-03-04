import { FC } from 'react';
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  BoxProps,
} from '@chakra-ui/react';
import SidebarNavItem from 'components/Sidebar/SidebarNavItem';
import useUserDashboardRoutes from 'hooks/useUserDashboardRoutes';
import { useTranslation } from 'react-i18next';

interface ISidebarContentProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent: FC<ISidebarContentProps> = ({ onClose, ...rest }) => {
  const routes = useUserDashboardRoutes(true);
  const { t } = useTranslation();

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton data-testid="closeButton" display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {routes.map((route) => (
        <>
          <SidebarNavItem key={route.name} icon={route.icon} route={route}>
            {t(`dashboard.${route.name}.title`)}
          </SidebarNavItem>
          {route.children && (
          <Box ml="8">
            {route.children.map((child) => (
              <SidebarNavItem key={child.name} icon={child.icon} route={child}>
                {t(`dashboard.${child.name}.title`)}
              </SidebarNavItem>
            ))}
          </Box>
          )}
        </>
      ))}
    </Box>
  );
};

export default SidebarContent;
