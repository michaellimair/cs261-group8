import React, { FC, useCallback } from 'react';
import CreateMilestoneCard from 'components/PlanOfAction/mentee-milestone/CreatePlanCard';
import { useTranslation } from 'react-i18next';
import {
  VStack,
  Button,
  Stack,
  Center,
  Heading,
  HStack,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { httpClient } from 'api';
import { useQuery } from 'react-query';
import PlanList from 'components/PlanOfAction/mentee-milestone/PlanList';

const MenteeMilestonePage: FC = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery(
    ['plans', 'list'],
    () => httpClient.menteePlanOfAction.listPlansOfAction(),
  );
  const [isShow, setIsShow] = React.useState(false);
  const handleClick = useCallback(() => {
    setIsShow((show) => !show);
  }, []);

  return (
    <Stack p="4" spacing="24px">
      <Center>
        <Heading size="2xl">{t('mentee_plan_title')}</Heading>
      </Center>
      <VStack spacing="0" align="stretch">
        <Button colorScheme="purple" size="lg" borderBottomRadius={isShow ? ('0') : 'lg'} onClick={handleClick}>
          {t('create_plan_button')}
          {' '}
          {isShow ? (<ChevronDownIcon />) : (<ChevronRightIcon />)}
        </Button>
        {isShow && <CreateMilestoneCard />}
      </VStack>
      <HStack justifyContent="space-between" alignItems="center">
        <Heading as="h2" size="md">
          {t('mentee_plan')}
        </Heading>
      </HStack>
      <PlanList isLoading={isLoading} plans={data} />
    </Stack>

  );
};
export default MenteeMilestonePage;
