import React, { FC, useCallback } from 'react';
import {
  StackDivider,
  Heading,
  Flex,
  Text,
  Box,
  Button,
  VStack,
  HStack,
  Input,
  Spacer,
  Textarea,
  Select,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { ITopicProps } from 'customTypes/group';
import { t } from 'i18next';

const MentorPotentialGroupCard: FC<ITopicProps> = ({
  title,
}) => {
  const [isShow, setIsShow] = React.useState(false);
  const handleClick = useCallback(() => {
    setIsShow((show) => !show);
  }, []);

  return (
    <VStack spacing="0" align="stretch">
      <Flex align="center" p="4" pl="8" pr="8" boxShadow="lg" m="0" borderRadius="lg" borderBottomRadius={isShow ? ('0') : 'lg'} bg="white" divider={<StackDivider borderColor="gray.200" />}>
        <VStack>
          <HStack>
            <Box flex="5">
              <Heading>{title}</Heading>
            </Box>
            <Box flex="1.5">
              <VStack align="stretch" pl="8">
                <Button colorScheme="blue" size="lg" onClick={handleClick}>
                  {t('dashboard.group_meetings.run_group')}
                  {isShow ? (<ChevronDownIcon />) : (<ChevronRightIcon />)}
                </Button>
              </VStack>
            </Box>
          </HStack>
        </VStack>
      </Flex>
      {isShow && (
        <Flex
          verticalAlign="top"
          align="center"
          p="4"
          pl="8"
          pr="8"
          boxShadow="lg"
          m="4"
          borderBottomRadius="lg"
          borderTopRadius="0"
          bg="white"
          divider={<StackDivider borderColor="gray.200" />}
        >
          <Box flex="1.25">
            <VStack align="left">
              <Heading size="md">{t('dashboard.group_meetings.create_meeting')}</Heading>
              <HStack>
                <Text w="200px">
                  {`${t('dashboard.group_meetings.meeting_type')}:`}
                </Text>
                <Select size="sm" placeholder="Select type">
                  <option value="session">{t('dashboard.group_meetings.group_session')}</option>
                  <option value="tutoring">{t('dashboard.group_meetings.group_tutoring')}</option>
                </Select>
              </HStack>
              <HStack>
                <Text w="200px">
                  {`${t('title')}:`}
                </Text>
                <Input placeholder="Meeting title" size="sm" type="text" id="title" />
              </HStack>
              <HStack>
                <Text w="200px">
                  {`${t('date')}:`}
                </Text>
                <Input size="sm" type="date" id="date" />
              </HStack>
              <HStack>
                <Text w="200px">
                  {`${t('time')}:`}
                </Text>
                <Input size="sm" type="time" id="time" />
              </HStack>
            </VStack>
          </Box>
          <Spacer flex="0.2" />
          <Box flex="3">
            <VStack align="left">
              <Text>{t('description')}</Text>
              <Textarea
                placeholder="Meeting description"
                resize="none"
                size="sm"
                height="180px"
                id="description"
              />
            </VStack>
          </Box>
          <Box flex="1">
            <VStack align="stretch" pl="8">
              <Button colorScheme="blue" variant="outline">
                {t('create')}
              </Button>
            </VStack>
          </Box>

        </Flex>
      )}
    </VStack>
  );
};

export default MentorPotentialGroupCard;
