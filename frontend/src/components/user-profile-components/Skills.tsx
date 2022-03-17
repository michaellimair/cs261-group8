import {
  FormLabel, Stack, Button,
} from '@chakra-ui/react';
import AddInterest from 'components/Interests/AddInterest';
import { UseFormSetValue } from 'react-hook-form';
import { useUser } from 'hooks/useUser';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IUserProfileDTO } from 'customTypes/auth';

const Skills: FC<{ setValue: UseFormSetValue<IUserProfileDTO> }> = ({
  setValue,
}) => {
  const { user } = useUser();
  const [userSkillList, setSkillList] = useState(user?.profile.skills!);
  const { t } = useTranslation();

  const deleteSkillHandler = (item:any) => {
    const filtered = userSkillList.filter((value: any) => value !== item);
    setSkillList(filtered);
    setValue('skills', filtered);
  };

  const addSkillHandler = async (addedArea: string) => {
    if (userSkillList.includes(addedArea) || addedArea === '-' || (!addedArea)) {
      return;
    }
    const newList = userSkillList.concat([addedArea]);
    setSkillList(newList);
    setValue('skills', newList);
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
      <FormLabel>{t('skills')}</FormLabel>
      <Stack direction="row">
        <AddInterest addInterest={addSkillHandler} />
      </Stack>
    </Stack>
  );
};

export default Skills;
