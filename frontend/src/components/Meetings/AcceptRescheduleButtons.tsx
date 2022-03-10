import {
  VStack,
  Button,
  Text,
} from '@chakra-ui/react';
import CustomDatePicker from 'components/CustomDatePicker';
import useCommonForm from 'hooks/useCommonForm';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface IRescheduleDTO {
  proposed: Date;
}

const AcceptRescheduleButtons = () => {
  const { t } = useTranslation();

  const { setValue, reset, watch } = useCommonForm<IRescheduleDTO, any, any>({
    mutationId: 'meeting-reschedule',
    // TODO: Add backend implementation
    // eslint-disable-next-line no-console
    mutationFn: async (values) => console.log(values),
  });

  const onChange = useCallback((date: Date | null) => {
    if (date) {
      setValue('proposed', date);
    } else {
      reset();
    }
  }, [setValue, reset]);

  const selected = watch('proposed');

  return (
    <VStack align="stretch" pl="8">
      <Button colorScheme="green">{t('accept')}</Button>
      <Text align="center" fontWeight="bold">
        {t('or')}
      </Text>
      <Text>
        {t('select_alternative_time')}
      </Text>
      <CustomDatePicker
        showTimeSelect
        selected={selected}
        dateFormat="Pp"
        onChange={onChange}
        minDate={new Date()} // Date must be in the future
      />
      <Button colorScheme="red" disabled={!selected}>
        {t('reschedule')}
      </Button>
    </VStack>
  );
};

export default AcceptRescheduleButtons;
