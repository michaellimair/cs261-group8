import {
  Button,
  Flex,
  Select,
  Checkbox,
  Stack,
  Heading,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  Center,
  IconButton,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import React, {
  useState,
  FC,
} from 'react';

import { useTranslation } from 'react-i18next';
import AddInterest from 'components/Interests/AddInterest';
import InterestList from 'components/Interests/InterestList';
import { IInterest } from 'customTypes/interest';

const interestList = [
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' },
  { id: 3, text: 'Item 3' },
];

const WelcomeForm: FC = () => {
  const { t } = useTranslation();

  const [interests, setInterests] = useState<IInterest[]>(interestList);
  const deleteInterest = (id: IInterest['id']) => {
    const newInterests = interests.filter((item: { id: number; }) => item.id !== id);
    setInterests(newInterests);
  };

  const addInterest = (newInterest: IInterest) => {
    setInterests([...interests, newInterest]);
  };
  return (
    <>
      <Stack align="center">
        <Heading fontSize="4xl">
          {t('welcome')}
        </Heading>
      </Stack>
      <Flex
        w="100%"
        align="center"
        rounded="lg"
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow="lg"
        p={8}
      >
        <Stack w="200px" direction={['column', 'row']} spacing={6}>
          <Stack h="10%">
            <Center>
              <Avatar size="xl">
                <AvatarBadge
                  align="center"
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center>
              <Button w="full">{t('change_avatar')}</Button>
            </Center>
          </Stack>
        </Stack>
        <Stack w="66%" spacing="36px">
          <Stack direction={['column', 'row']} spacing={6}>
            <Stack w="200px">
              <Heading fontSize="1xl">{t('select_mentor_mentee')}</Heading>
              <Stack direction={['column', 'row']} spacing={6}>
                <Checkbox>{t('mentor')}</Checkbox>
                <Checkbox>{t('mentee')}</Checkbox>
              </Stack>
            </Stack>
            <Stack width="200px">
              <Heading fontSize="1xl">{t('business_area')}</Heading>
              <Select placeholder={t('select_option')} maxW="200px" size="md">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </Stack>
          </Stack>
          <Heading fontSize="1xl">Interests</Heading>
          <InterestList interests={interests} deleteInterest={deleteInterest} />
          <AddInterest addInterest={addInterest} />
          <Select placeholder={t('select_option')} maxW="200px" size="md">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          <Stack direction={['column', 'row']} spacing={6}>
            <Stack width="200px">
              <Heading fontSize="1xl">{t('seniority')}</Heading>
              <Select placeholder={t('select_option')} maxW="200px" size="md">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </Stack>
            <Stack width="200px">
              <Heading fontSize="1xl">{t('years_of_experience')}</Heading>
              <Select placeholder={t('select_option')} maxW="200px" size="md">
                <option value="option1">0-5 years</option>
                <option value="option2">5-10 years</option>
                <option value="option3">10+ years</option>
              </Select>
            </Stack>
          </Stack>
          <Stack direction={['column', 'row']} spacing={6}>
            <Stack width="200px">
              <Heading fontSize="1xl">{t('time_zone')}</Heading>
              <Select placeholder={t('select_option')} maxW="200px" size="md">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </Stack>
            <Stack width="200px">
              <Heading fontSize="1xl">{t('country')}</Heading>
              <Select placeholder={t('select_option')} maxW="200px" size="md">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
};

export default WelcomeForm;
