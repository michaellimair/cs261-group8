import {
  Flex,
  Box,
  Input,
  Button,
  Heading,
  Stack,
  Center,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const CreateMilestoneCard = () => {
  const { t } = useTranslation();

  return (
    <Flex
      verticalAlign="top"
      align="center"
      p="4"
      boxShadow="lg"
      m="4"
      borderBottomRadius="lg"
      borderTopRadius="0"
      bg="white"
    >
      <Box
        m="20px"
      >
        <Stack m="20px">
          <Box>
            <Heading size="sm">{t('create_milestone_title')}</Heading>
            <Center>
              <Input placeholder="Milestone title" p="10px" width="400px" />
              <Button m="5px" size="sm" width="100px" colorScheme="blue">Create</Button>
            </Center>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
};

export default CreateMilestoneCard;
