import { FC } from 'react';
import {
  Flex,
  FlexProps,
  Icon,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { IDashboardRoute } from 'routes';
import RouterLink from 'components/RouterLink';

interface ISidebarNavItemProps extends FlexProps {
  icon?: IconType;
  route: IDashboardRoute;
}

const SidebarNavItem: FC<ISidebarNavItemProps> = ({
  icon, route, children, ...rest
}) => (
  <RouterLink to={route.path ?? '/dashboard'} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: 'cyan.400',
        color: 'white',
      }}
      {...rest}
    >
      {icon && (
      <Icon
        mr="4"
        fontSize="16"
        _groupHover={{
          color: 'white',
        }}
        as={icon}
        data-testid="sidebarNavIcon"
      />
      )}
      {children}
    </Flex>
  </RouterLink>
);

export default SidebarNavItem;
