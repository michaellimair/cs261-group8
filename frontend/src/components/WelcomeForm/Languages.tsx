import {
  Button,
  UnorderedList,
  ListItem,
  Select,
  Stack,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFieldArray, Control } from 'react-hook-form';
import { IUserProfileDTO } from 'customTypes/auth';
import { DeleteIcon } from '@chakra-ui/icons';
import useLanguages from 'hooks/useLanguages';

const LanguageList: FC<{ control: Control<IUserProfileDTO> }> = ({
  control,
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<string>('');
  const languages = useLanguages();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'languages',
  });

  return (
    <Stack spacing={5}>
      <FormControl>
        <FormLabel data-testid="languages-label">{t('languages')}</FormLabel>
        <UnorderedList>
          {fields.map((field, index) => (
            <ListItem key={field.code} mb={2}>
              {field.name ?? languages.find((it) => it.code === field.code)?.name}
              <Button onClick={() => remove(index)} ml={2}>
                <DeleteIcon color="red.500" />
              </Button>
            </ListItem>
          ))}
        </UnorderedList>
        <Select
          placeholder={t('select_language')}
          onChange={(e) => {
            const languageItem = languages.find(({ code }) => code === e.target.value);
            append(languageItem!);
            setValue('');
          }}
          value={value}
        >
          {languages.map(({ code, name }) => (
            <option value={code} key={code}>{name}</option>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default React.memo(LanguageList);
