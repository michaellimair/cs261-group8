import { FC } from 'react';
import {
  Flex,
  FlexProps,
  Icon,
  Link,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface ISidebarNavItemProps extends FlexProps {
  icon: IconType;
}

const SidebarNavItem: FC<ISidebarNavItemProps> = ({ icon, children, ...rest }) => (
  <Link href="/" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
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
      />
      )}
      {children}
    </Flex>
  </Link>
);

export default SidebarNavItem;
