import {
  Select,
  Stack,
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
          <Stack>
            <Text>{interest.text}</Text>
            <DeleteIcon color="red.500" mr="2" onClick={() => deleteInterest(interest.id)} />
            <Select placeholder="select_option" maxW="200px" size="md">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Stack>
        ))}
      </Stack>
    )
);
export default InterestList;
