import {
  FormLabel, Stack, Button, Select,
} from '@chakra-ui/react';

import useSkillsOptions from 'hooks/useSkillsOptions';
import { useUser } from 'hooks/useUser';
import { FC, useState } from 'react';

const Skills: FC = () => {
  const { user } = useUser();
  const skillsOptions = useSkillsOptions()!;
  const [userSkillList, setSkillList] = useState(user?.profile.skills!);
  const [addedArea, setAddedArea] = useState('-');

  const deleteSkillHandler = (item:any) => {
    const filtered = userSkillList.filter((value: any) => value !== item);
    setSkillList(filtered);
  };

  const addSkillHandler = async () => {
    if (userSkillList.includes(addedArea) || addedArea === '-' || (!addedArea)) {
      return;
    }
    const newList = userSkillList.concat([addedArea]);
    setSkillList(newList);
  };

  return (
    <Stack spacing={3}>
      <FormLabel>Current skills</FormLabel>
      <Stack spacing={2}>
        {userSkillList
          .map((item) => (
            <Stack direction="row" spacing={4}>
              <li key={item} value={item}>{item}</li>
              <Button onClick={() => deleteSkillHandler(item)} size="sm" colorScheme="red">Delete</Button>
            </Stack>
          ))}
      </Stack>
      <FormLabel>Add skills from list below</FormLabel>
      <Stack direction="row">
        <Select
          onChange={(e) => {
            const val = e.target.value;
            setAddedArea(val);
          }}
          value={addedArea}
        >
          {skillsOptions.map((item) => (
            <option key={item.value} value={item.label}>{item.value}</option>
          ))}
        </Select>
        <Button onClick={() => addSkillHandler()} size="sm" colorScheme="green">Add</Button>
      </Stack>
    </Stack>
  );
};

export default Skills;
