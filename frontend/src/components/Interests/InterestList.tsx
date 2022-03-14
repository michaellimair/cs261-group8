import {
  Stack,
  HStack,
  Text,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import React, { FC } from 'react';

interface IInterestListProps {
  interests: string[];
  deleteInterest: (id: string) => void;
}

const InterestList: FC<IInterestListProps> = ({ interests, deleteInterest }) => (
  !interests.length
    ? (
      <Text>
        Add interests
      </Text>
    ) : (
      <Stack>
        {interests.map((value) => (
          <HStack key={value}>
            <Text>{value}</Text>
            <DeleteIcon color="red.500" mr="2" onClick={() => deleteInterest(value!)} />
          </HStack>
        ))}
      </Stack>
    )
);
export default InterestList;
