import { FC } from 'react';
import MentorMilestoneEdit from 'components/mentor-milestone/MentorMilestoneEdit';
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
      <MentorMilestoneEdit />
      <MentorMilestoneEdit />
    </Container>
  </Stack>
);

export default MentorMilestonePage;
