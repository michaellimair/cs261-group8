import {
  Stack,
} from '@chakra-ui/react';
import ApiError from 'api/error/ApiError';
import { IPlanOfActionCreateDTO, IPlanOfAction } from 'customTypes/plan-of-action';
import useCommonForm from 'hooks/useCommonForm';
import { httpClient } from 'api';
import PlanFormFields from './PlanFormFields';
import CreatePlanButton from './CreatePlanButton';

const CreatePlanCard = () => {
  const {
    onSubmit,
    errors,
    register,
    isLoading,
  } = useCommonForm<IPlanOfActionCreateDTO, ApiError<any>, IPlanOfAction>({
    // eslint-disable-next-line max-len
    mutationFn: (plan: IPlanOfActionCreateDTO) => httpClient.menteePlanOfAction.createPlanOfAction(plan),
    mutationId: ['plan', 'create'],
  });

  return (
    <Stack
      verticalAlign="top"
      align="left"
      p="4"
      boxShadow="lg"
      m="4"
      borderBottomRadius="lg"
      borderTopRadius="0"
      bg="white"
    >
      <form onSubmit={onSubmit} data-testid="planForm">
        <PlanFormFields
          errors={errors}
          register={register}
        />
        <CreatePlanButton isLoading={isLoading} />
      </form>
    </Stack>
  // <Flex
  //   verticalAlign="top"
  //   align="center"
  //   p="4"
  //   boxShadow="lg"
  //   m="4"
  //   borderBottomRadius="lg"
  //   borderTopRadius="0"
  //   bg="white"
  // >
  //   <Box
  //     m="20px"
  //   >
  //     <Stack m="20px">
  //       <Box>
  //         <Heading size="sm">{t('create_plan_title')}</Heading>
  //         <Center>
  //           <Input placeholder="Plan of Action title" p="10px" width="400px" />
  //           <Button m="5px" size="sm" width="100px" colorScheme="blue">Create</Button>
  //         </Center>
  //       </Box>
  //     </Stack>
  //   </Box>
  // </Flex>
  );
};

export default CreatePlanCard;
