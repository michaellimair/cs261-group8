import {
  VStack,
  Button,
  Text,
  HStack,
  PinInput,
  PinInputField,
  Select,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

const AcceptRescheduleButtons = () => {
  const { t } = useTranslation();

  return (
    <VStack align="stretch" pl="8">
      <Button colorScheme="green">{t('accept')}</Button>
      <Button colorScheme="red">
        {t('reschedule')}
      </Button>
      <HStack spacing="1">
        <VStack align="left" spacing="3">
          <Text>
            {t('date')}
            :
          </Text>
          <Text>
            {t('time')}
            :
          </Text>
        </VStack>
        <VStack align="left">
          <HStack spacing="0.5">
            <PinInput placeholder="D" size="sm">
              <PinInputField isRequired />
              <PinInputField isRequired />
            </PinInput>
            <Text>
              /
            </Text>
            <PinInput placeholder="M" size="sm">
              <PinInputField isRequired />
              <PinInputField isRequired />
            </PinInput>
            <Text>
              /
            </Text>
            <PinInput placeholder="Y" size="sm">
              <PinInputField isRequired />
              <PinInputField isRequired />
            </PinInput>
          </HStack>
          <HStack spacing="0.5">
            <PinInput placeholder="H" size="sm">
              <PinInputField isRequired />
              <PinInputField isRequired />
            </PinInput>
            <Text>
              :
            </Text>
            <PinInput placeholder="M" size="sm">
              <PinInputField isRequired />
              <PinInputField isRequired />
            </PinInput>
            <Select size="sm" width="180">
              <option value="am">{t('am')}</option>
              <option value="pm">{t('pm')}</option>
            </Select>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default AcceptRescheduleButtons;
