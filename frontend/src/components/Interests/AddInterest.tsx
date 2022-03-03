import {
  Stack, Select, Button, useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { nanoid } from 'nanoid';

const AddInterest = ({ addInterest } : { addInterest:any }) => {
  const toast = useToast();
  const [value, setValue] = useState('');

  function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    if (value === '') {
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
  }
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={5}>
        <Select
          placeholder="select_option"
          maxW="200px"
          size="md"
          onChange={(e) => setValue(e.target.value)}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        <Button colorScheme="teal" type="submit">Add Interest</Button>
      </Stack>
    </form>
  );
};

export default AddInterest;
