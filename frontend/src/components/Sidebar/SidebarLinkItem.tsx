import { FC } from 'react';
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  BoxProps,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import SidebarNavItem from 'components/Sidebar/SidebarNavItem';

interface ILinkItem {
  name: string;
  icon: IconType;
}

const linkItems: Array<ILinkItem> = [
  { name: 'Home', icon: FiHome },
  { name: 'Trending', icon: FiTrendingUp },
  { name: 'Explore', icon: FiCompass },
  { name: 'Favourites', icon: FiStar },
  { name: 'Settings', icon: FiSettings },
];

interface ISidebarContentProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent: FC<ISidebarContentProps> = ({ onClose, ...rest }) => (
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
    {linkItems.map((link) => (
      <SidebarNavItem key={link.name} icon={link.icon}>
        {link.name}
      </SidebarNavItem>
    ))}
  </Box>
);

export default SidebarContent;
