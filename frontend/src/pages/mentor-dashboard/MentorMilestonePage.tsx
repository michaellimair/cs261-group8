import { FC } from 'react';
import { Box, Container, Stack } from '@chakra-ui/react';
import ViewMenteeMilestone from 'components/mentor-milestone/ViewMenteeMilestone';
import MenteeMilestone from 'components/mentee-milestone/MenteeMilestone';

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
