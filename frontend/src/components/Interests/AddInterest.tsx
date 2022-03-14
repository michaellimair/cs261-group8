import {
  Stack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSkillsOptions from 'hooks/useSkillsOptions';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';

const AddInterest = ({ addInterest } : { addInterest: any }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<string>('');
  const interestOptions = useSkillsOptions(value);

  return (
    <Stack spacing={5}>
      <AutoComplete
        placeholder={t('select_option')}
        openOnFocus
        shouldRenderSuggestions={(query) => query.length > 3}
        onSelectOption={({ item }) => {
          addInterest(item.value);
          setValue('');
        }}
      >
        <AutoCompleteInput variant="filled" value={value} onChange={(e) => setValue(e.target.value)} />
        <AutoCompleteList>
          {(interestOptions ?? []).map(({ value: interestValue, label }) => (
            <AutoCompleteItem
              key={`option-${interestValue}`}
              value={interestValue ?? ''}
              textTransform="capitalize"
            >
              {label}
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>
    </Stack>
  );
};

export default AddInterest;
