import {
  Stack,
  HStack,
  Text,
  Button,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import React, { FC } from 'react';

interface IInterestListProps {
  interests: string[];
  deleteInterest: (id: string) => void;
}

const InterestList: FC<IInterestListProps> = ({ interests, deleteInterest }) => (
  <Stack>
    {interests.map((value) => (
      <HStack key={value}>
        <Text>{value}</Text>
        <Button onClick={() => deleteInterest(value!)} mr={2}>
          <DeleteIcon color="red.500" />
        </Button>
      </HStack>
    ))}
  </Stack>
);
export default InterestList;
