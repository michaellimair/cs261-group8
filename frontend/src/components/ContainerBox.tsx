import { FC } from 'react';
import { useColorModeValue, Box } from '@chakra-ui/react';

const ContainerBox: FC = ({ children }) => (
  <Box
    p="4"
    boxShadow="lg"
    mt="4"
    borderRadius="md"
    bg={useColorModeValue('white', 'gray.700')}
  >
    {children}
  </Box>
);

export default ContainerBox;
