import { Button } from '@chakra-ui/react';
import RouterLink from 'components/RouterLink';
import { FC } from 'react';

const CreateFeedbackLink: FC = () => (
  <Button as={RouterLink} to="/dashboard/feedbacks/create" colorScheme="green">
    Create Feedback
  </Button>
);

export default CreateFeedbackLink;
