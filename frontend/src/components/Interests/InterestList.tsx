import {
  Stack,
  HStack,
  Text,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import React, { FC } from 'react';
import { IInterest } from 'customTypes/interest';

interface IInterestListProps {
  interests: IInterest[];
  deleteInterest: (id: IInterest['id']) => void;
}

const InterestList: FC<IInterestListProps> = ({ interests, deleteInterest }) => (
  !interests.length
    ? (
      <Text>
        Add interests
      </Text>
    ) : (
      <Stack>
        {interests.map((interest: IInterest) => (
          <HStack>
            <Text>{interest.text}</Text>
            <DeleteIcon color="red.500" mr="2" onClick={() => deleteInterest(interest.id)} />
          </HStack>
        ))}
      </Stack>
    )
);
export default InterestList;
