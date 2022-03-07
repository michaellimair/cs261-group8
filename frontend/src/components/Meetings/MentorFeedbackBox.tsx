import {
  VStack,
  Button,
  Textarea,
} from '@chakra-ui/react';

const MentorFeedbackBox = () => (
  <VStack align="center" alignItems="stretch" pl="8">
    <Textarea
      placeholder="Write your feedback here"
      resize="none"
      size="sm"
      height="180px"
    />
    <Button colorScheme="blue">
      Submit feedback
    </Button>
  </VStack>
);

export default MentorFeedbackBox;
