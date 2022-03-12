import {
  Stack, Text, Button, VStack, HStack, Progress, Accordion,
} from '@chakra-ui/react';
import ContainerBox from 'components/ContainerBox';
import { IPlanOfAction } from 'customTypes/plan-of-action';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import MilestoneList from '../mentee-milestone/MilestoneList';

interface IPlanRowProps {
  plan: IPlanOfAction;
}

const PlanRow: FC<IPlanRowProps> = ({
  plan: {
    title, description, created, modified, milestones,
  },
}) => {
  const { t } = useTranslation();
  const progress = milestones.filter((it) => it.completed).length / milestones.length;

  return (
    <ContainerBox>
      <Stack direction="row" alignItems="center" mb="2">
        <Text fontWeight="semibold" fontSize="xl" mr={2}>{title}</Text>
        <Progress width="400px" height="30px" colorScheme="red" value={progress} />
      </Stack>
      <VStack
        my="2"
        direction={{ base: 'column', md: 'row' }}
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Text fontSize={{ base: 'md' }} whiteSpace="pre-wrap">
          {description}
        </Text>
      </VStack>
      <HStack m="20px" mt="40px" spacing={6} style={{ alignItems: 'end' }}>
        <Accordion allowMultiple>
          <MilestoneList isLoading={false} milestones={milestones} />
        </Accordion>
        <Button id="add-btn" colorScheme="green">+</Button>
        <Button id="remove-btn" colorScheme="red">-</Button>
      </HStack>
      <Stack direction={{ base: 'column', lg: 'row' }} justifyContent="space-between" mt="4">
        <VStack
          alignItems="flex-start"
        >
          <Text fontSize={{ base: 'xs' }}>
            {t('created', { created })}
          </Text>
          {modified && (
          <Text fontSize={{ base: 'xs' }}>
            {t('modified', { modified })}
          </Text>
          )}
        </VStack>
      </Stack>
    </ContainerBox>
  );
};

export default PlanRow;
