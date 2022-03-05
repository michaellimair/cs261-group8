import { Box, Center, Heading } from '@chakra-ui/react';
import { FC } from 'react';

const AcceptedMeeting: FC = () => (
  <Box color="green" border="1px" width="fit-content">
    <Center width="150px">
      <Heading mt="35px" size="md">Accepted</Heading>
    </Center>
  </Box>
);

export default AcceptedMeeting;
