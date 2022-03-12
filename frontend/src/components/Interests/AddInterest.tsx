import {
  Stack, Select, Button, useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import CreateSelect from 'components/Forms/WelcomeForm/CreateSelect';

const interestOptions = [
  'interest 1',
  'interest 2',
  'interest 3',
];

const AddInterest = ({ addInterest } : { addInterest:any }) => {
  const { t } = useTranslation();
  const toast = useToast();
  const [value, setValue] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (value === null) {
      toast({
        title: 'Please enter the text.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const interest = {
      id: nanoid(),
      text: value,
    };

    addInterest(interest);
    setValue('');
  };

  return (
    <Stack spacing={5}>
      <Select
        placeholder={t('select_option')}
        maxW="200px"
        size="md"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      >
        <CreateSelect options={interestOptions} />
      </Select>
      <Button w="200px" colorScheme="teal" onClick={handleSubmit}>Add Interest</Button>
    </Stack>
  );
};

export default AddInterest;
