import {
  Text,
  Flex,
  StackDivider,
  Box,
  VStack,
  Button,
} from '@chakra-ui/react';
import AddInterest from 'components/Interests/AddInterest';
import InterestList from 'components/Interests/InterestList';
import { IInterest } from 'customTypes/interest';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ProposeGroupSession = () => {
  const { t } = useTranslation();
  const [interests, setInterests] = useState<IInterest[]>([]);
  const deleteInterest = (interestId: IInterest['id']) => {
    const newInterests = interests?.filter((item: { id: number; }) => item.id !== interestId);
    setInterests(newInterests);
  };

  const addInterest = (newInterest: IInterest) => {
    setInterests([...interests, newInterest]);
  };

  return (
    <Flex
      verticalAlign="top"
      align="center"
      p="4"
      pl="8"
      pr="8"
      boxShadow="lg"
      m="4"
      borderBottomRadius="lg"
      borderTopRadius="0"
      bg="white"
      divider={<StackDivider borderColor="gray.200" />}
    >
      <Box w="75%">
        <VStack align="left">
          <Text>{t('dashboard.group_meetings.select_topics')}</Text>
          <InterestList interests={interests} deleteInterest={deleteInterest} />
          <AddInterest addInterest={addInterest} />
        </VStack>
      </Box>
      <Box w="25%">
        <VStack align="stretch" pl="8">
          <Button colorScheme="blue" variant="outline">
            {t('dashboard.group_meetings.propose_sessions')}
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default ProposeGroupSession;
