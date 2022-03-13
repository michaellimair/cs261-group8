import { FC } from 'react';
import { Box, Container, Stack } from '@chakra-ui/react';
import ViewMenteeMilestone from 'components/PlanOfAction/mentor-milestone/ViewMenteeMilestone';
import MenteePlan from 'components/PlanOfAction/mentee-milestone/MenteePlan';

const MentorMilestonePage: FC = () => (
  <Stack direction="row">
    <Box
      m="20px"
      rounded="xl"
      boxShadow="lg"
      height="fixed"
      width="fit-content"
      scrollBehavior="smooth"
    >
      <ViewMenteeMilestone />
      <ViewMenteeMilestone />
      <ViewMenteeMilestone />
      <ViewMenteeMilestone />
      <ViewMenteeMilestone />
    </Box>
    <Container>
      <MenteePlan />
      <MenteePlan />
      <MenteePlan />
    </Container>
  </Stack>
);

export default MentorMilestonePage;
