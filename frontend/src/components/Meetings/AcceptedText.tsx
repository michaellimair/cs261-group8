import {
  Text,
  Box,
} from '@chakra-ui/react';

const AcceptedText = () => (
  <Box pl="8">
    <Text fontSize={{ base: '3xl' }} fontWeight="bold" textAlign="center" color="green">
      Accepted
    </Text>
  </Box>
);

export default AcceptedText;
