import { Center, Input, Stack } from '@chakra-ui/react';
import { FC } from 'react';

const MentorComment: FC = () => (
  <Stack m="20px" direction="row">
    <Center>
      <Input type="text" width="500px" m="10px" placeholder="Mentor comment" readOnly />
    </Center>
  </Stack>
);

export default MentorComment;
