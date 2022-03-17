import {
  InputGroup,
  InputLeftElement,
  Spinner,
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
import { SearchIcon } from '@chakra-ui/icons';

const AddInterest = ({ addInterest } : { addInterest: (value: string) => void }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<string>('');
  const { options: interestOptions, isFetching } = useSkillsOptions(value);

  return (
    <AutoComplete
      placeholder={t('select_option')}
      openOnFocus
      shouldRenderSuggestions={(query) => query.length > 3}
      onSelectOption={({ item }) => {
        addInterest(item.value);
        setValue('');
      }}
    >
      <InputGroup>
        <InputLeftElement h="full">
          {isFetching ? <Spinner /> : <SearchIcon />}
        </InputLeftElement>
        <AutoCompleteInput variant="filled" value={value} onChange={(e) => setValue(e.target.value)} />
      </InputGroup>
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
  );
};

export default AddInterest;
