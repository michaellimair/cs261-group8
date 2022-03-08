import { FC } from 'react';
import MentorMilestone from 'components/mentor-milestone/MentorMilestone';
import { Box, Container, Stack } from '@chakra-ui/react';
import ViewMenteeMilestone from 'components/mentor-milestone/ViewMenteeMilestone';

const MentorMilestonePage: FC = () => (
  <Stack direction="row">
    <Box m="20px" border="1px" height="fixed" width="fit-content" scrollBehavior="smooth">
      <ViewMenteeMilestone />
      <ViewMenteeMilestone />
      <ViewMenteeMilestone />
      <ViewMenteeMilestone />
      <ViewMenteeMilestone />
    </Box>
    <Container>
      <MentorMilestone />
      <MentorMilestone />
    </Container>
  </Stack>
);

export default MentorMilestonePage;
