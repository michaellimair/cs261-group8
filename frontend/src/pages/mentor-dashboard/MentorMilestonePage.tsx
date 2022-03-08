import { FC } from 'react';
// import MentorMilestone from 'components/mentor-milestone/MentorMilestone';
import { Box, Container, Stack } from '@chakra-ui/react';
import ViewMenteeMilestone from 'components/PlanOfAction/mentor-milestone/ViewMenteeMilestone';
import MenteeMilestone from 'components/PlanOfAction/mentee-milestone/MenteeMilestone';

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
      <MenteeMilestone />
      <MenteeMilestone />
      <MenteeMilestone />
    </Container>
  </Stack>
);

export default MentorMilestonePage;
