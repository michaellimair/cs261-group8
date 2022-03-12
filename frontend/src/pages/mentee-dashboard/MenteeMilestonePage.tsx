import React, { FC, useCallback } from 'react';
import MenteeMilestoneCard from 'components/PlanOfAction/mentee-milestone/MenteeMilestoneCard';
import CreateMilestoneCard from 'components/PlanOfAction/shared-components/CreateMilestoneCard';
import { useTranslation } from 'react-i18next';
import {
  VStack,
  Button,
  Stack,
  Center,
  Heading,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';

const MenteeMilestonePage: FC = () => {
  const { t } = useTranslation();
  const [isShow, setIsShow] = React.useState(false);
  const handleClick = useCallback(() => {
    setIsShow((show) => !show);
  }, []);

  return (
    <Stack p="4" spacing="24px">
      <Center>
        <Heading size="2xl">{t('mentee_plan')}</Heading>
      </Center>
      <VStack spacing="0" align="stretch">
        <Button colorScheme="purple" size="lg" borderBottomRadius={isShow ? ('0') : 'lg'} onClick={handleClick}>
          {t('create_plan')}
          {' '}
          {isShow ? (<ChevronDownIcon />) : (<ChevronRightIcon />)}
        </Button>
        {isShow && <CreateMilestoneCard />}
      </VStack>
      <MenteeMilestoneCard />
    </Stack>

  );
};
export default MenteeMilestonePage;
