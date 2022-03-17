import {
  Button,
  UnorderedList,
  ListItem,
  Select,
  Stack,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useFieldArray, Control } from 'react-hook-form';
import { IUserProfileDTO } from 'customTypes/auth';
import { DeleteIcon } from '@chakra-ui/icons';
import useGroupOptions from 'hooks/useGroupOptions';

const LanguageList: FC<{ control: Control<IUserProfileDTO> }> = ({
  control,
}) => {
  const { t } = useTranslation();
  const { fields, append, remove } = useFieldArray({
    name: 'groups',
    control,
    keyName: 'uid',
  });
  const groups = useGroupOptions();

  return (
    <Stack spacing={5}>
      <FormControl>
        <FormLabel data-testid="select_mentor_mentee-label">{t('select_mentor_mentee')}</FormLabel>
        <UnorderedList>
          {fields.map((field, index) => (
            <ListItem key={field.id} mb={2} textTransform="capitalize">
              {field.name}
              <Button onClick={() => remove(index)} ml={2}>
                <DeleteIcon color="red.500" />
              </Button>
            </ListItem>
          ))}
        </UnorderedList>
        <Select
          placeholder={t('select_user_type')}
          onChange={(e) => {
            const languageItem = groups?.find(({ id }) => `${id}` === e.target.value);
            if (!fields.find((it) => it.name === languageItem?.name)) {
              append(languageItem!);
            }
          }}
          value=""
        >
          {groups?.map(({ id, name }) => (
            <option value={id} key={id} style={{ textTransform: 'capitalize' }}>{name}</option>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default React.memo(LanguageList);
