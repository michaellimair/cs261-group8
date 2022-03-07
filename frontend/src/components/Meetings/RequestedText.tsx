import {
  Text,
  Box,
} from '@chakra-ui/react';

const RequestedText = () => (
  <Box pl="8">
    <Text fontSize={{ base: '3xl' }} fontWeight="bold" textAlign="center" color="orange">
      Meeting requested
    </Text>
  </Box>
);

export default RequestedText;
